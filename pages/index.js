
import { Client } from "@notionhq/client"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"


const NOTION_BLOG_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_ID
const NOTION_KEY = process.env.NEXT_PUBLIC_NOTION_KEY

const notionClient = new Client({auth: NOTION_KEY})
export async function getAllPosts(){
  const allPosts = await notionClient.databases.query({database_id: NOTION_BLOG_ID})
  const allData = allPosts?.results?.map((post) => {
      return {
        id: post.id,
        title: post.properties.title?.title[0].plain_text,
        date: post.properties.date?.date?.start,
        slug: post.properties.slug?.rich_text[0]?.plain_text,
        heroImage: post.properties.heroImage?.files?.[0]?.file?.url,
        url: post?.url,
      };
      })
  console.log("All data  ==== ",allPosts)
  return allData;
}

export async function getStaticProps(){
  const posts = await getAllPosts();
  const pageData = await notionClient.blocks.children.list({
    block_id: '4bbd0927-fdef-4654-8c4e-8b4707bcf427'
    });
    console.log("page data = ",pageData);
  return{
    props:{
      posts:posts
    }
  }
}

export default function Home({posts}){
  console.log(posts);
  return (
    <main className="min-h-screen w-full bg-[#fff6ed] p-4">
      <div className="flex justify-center items-center">
        <div className="flex flex-col w-full md:w-1/2">
          <section className="my-6">
            <h1 className="text-4xl text-center text-gray-800 my-6">
              Hey there
            </h1>
            <p className="indent-4 antialiase tracking-normal">
              Welcome to my blog, where code meets creativity! As a full-time
              software engineer with a passion for crafting mini software
              products, I spend my weekends turning ideas into reality. Over the
              past year, I&apos;ve brought to life over 10 projects, each a
              testament to my love for innovation and problem-solving.
            </p>
            <p className="indent-4 mt-1 antialiase">
              But this blog is more than just a project—it&apos;s a showcase of
              my journey as a developer. Here, I delve into the
              intersection of technology and storytelling, utilizing Notion as
              my CMS to weave together my thoughts, experiences, and insights.
              Join me as I explore the ever-evolving landscape of software
              development, share tips and tricks, and dive into the fascinating
              world of coding. <span className="text-green-500">Welcome aboard!</span>
            </p>
          </section>
          <section>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post, index) => {
                return (
                  <li
                    key={index}
                    className="flex flex-col justify-center items-center hover:cursor-pointer text-xl font-semibold text-black"
                  >
                    <Link href="/[slug]" as={`/${post?.id}`} replace>
                      <Image
                        width={270 * 2}
                        height={100}
                        aspectRatio={2.0}
                        priority
                        src={post?.heroImage}
                        alt={post?.slug}
                        className="rounded-xl border border-yellow-200"
                      />
                      <h2 className="my-4 flex text-center">{post?.title}</h2>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}