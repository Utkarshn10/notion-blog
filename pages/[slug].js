import { useRouter } from "next/router"
import { Client } from "@notionhq/client"
import { useEffect, useState } from "react"
import { NotionToMarkdown } from "notion-to-md"
import ReactMarkdown from 'react-markdown'
import getDataFromObject from "@/utils/getObject"
import Image from "next/image"

const NOTION_BLOG_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_ID
const NOTION_KEY = process.env.NEXT_PUBLIC_NOTION_KEY
const notionClient = new Client({auth: NOTION_KEY})


export async function getStaticPaths(){
    const allPosts = await notionClient.databases.query({database_id: NOTION_BLOG_ID})
    const paths = allPosts?.results?.map((post) => {
      return {
        params: {
          slug: post.id,
        },
      };
    });
    return { paths, fallback: false }
}

export async function getStaticProps({params}){
    const n2m = new NotionToMarkdown({ notionClient: notionClient });
    const {slug} = params
    const pages = await notionClient.pages.retrieve({page_id: slug});
    const metaData = getDataFromObject(pages)
    const response = await notionClient.blocks.children.list({
      block_id: slug, // Assuming slug is the ID you want to pass
    });
    const pageData = response.results[0]
    const mdblocks = await n2m.pageToMarkdown(slug);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
        props: {
            pageData:mdString,
            metaData: metaData,
        }
    };
}

export default function BlogContent({pageData,metaData}){
    const convertDate = (inputDate) =>{
        const date = new Date(inputDate);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
        return formattedDate;
    }

    return(
        <main className="min-h-screen w-full bg-[#fff6ed]">
            <section className="py-2 px-8 text-stone-700">
            <Image
                width={270 * 4}
                height={100}
                priority
                src={metaData?.heroImage}
                alt={metaData?.slug}
                className="rounded-xl"
            />
            <p className="font-semibold my-4">{convertDate(metaData?.date)}</p>
            <ReactMarkdown className="my-6">{pageData?.parent}</ReactMarkdown>
            </section>
        </main>
    )
}