import { useRouter } from "next/router"
import { Client } from "@notionhq/client"
import { useEffect, useState } from "react"

const NOTION_BLOG_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_ID
const NOTION_KEY = process.env.NEXT_PUBLIC_NOTION_KEY
const notionClient = new Client({auth: NOTION_KEY})


export async function getStaticPaths(){
    const allPosts = await notionClient.databases.query({database_id: NOTION_BLOG_ID})
    const paths = allPosts?.results?.map((post) => {
      return {
        params: { slug: post.id },
      };
    });
    console.log("paths =",paths)
    return { paths, fallback: false }
}

export async function getStaticProps({params}){
    const {slug} = params
    console.log("slug = ",slug)
    const pageData = await notionClient.blocks.children.list({
      block_id: slug, // Assuming slug is the ID you want to pass
    });
    console.log("page data = ",pageData);
    
    return {
        props: {
            pageData:pageData
        }
    };
}

export default function BlogContent({pageData}){
    console.log(pageData)
    return(
        <main className="min-h-screen">
            <section className="">
            {/* <Image */}
            </section>
        </main>
    )
}