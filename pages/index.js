
import HeroSection from "@/components/hero"
import getDataFromObject from "@/utils/getObject"
import { Client } from "@notionhq/client"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_AUTHOR, SITE_URL } from '@/utils/config'

import { useEffect } from "react"


const NOTION_BLOG_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_ID
const NOTION_KEY = process.env.NEXT_PUBLIC_NOTION_KEY

const notionClient = new Client({auth: NOTION_KEY})
export async function getAllPosts(){
  const allPosts = await notionClient.databases.query({
    database_id: NOTION_BLOG_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
  });
  const allData = allPosts?.results?.map((post) => {
      return getDataFromObject(post)
      })
  return allData;
}

export async function getStaticProps(){
  const posts = await getAllPosts();
  return {
    props: {
      posts: posts,
    },
  };
}

export default function Home({posts}){
  return (
    <main className="min-h-screen w-full  px-4 font-customfont">
       <Head>
          {/* Title */}
          <title>{SITE_TITLE}</title>

          {/* Open Graph (OG) tags */}
          <meta property="og:title" content={SITE_TITLE} />
          <meta property="og:url" content={SITE_URL} />
          <meta property="og:type" content="article" />

          {/* Twitter Card */}
          <meta name="twitter:title" content={SITE_TITLE} />
          <meta name="twitter:card" content="summary_large_image" />

          {/* Canonical URL */}
          <link rel="canonical" href={SITE_URL} />

          {/* Viewport Meta Tag */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />

          {/* CSS */}
          <link rel="stylesheet" href="/styles.css" />

          {/* JavaScript */}
          <script src="/script.js" defer></script>
        </Head>
      <div className="flex justify-center items-center flex-col w-full">
         <HeroSection />
        <div className="flex flex-col w-full md:w-4/5">
          <section>
            <div className="flex flex-col space-y-4">
              <p className="indent-4 antialiase tracking-normal text-stone-600">
                Welcome to my blog, where code meets creativity! As a full-time
                software engineer with a passion for crafting mini software
                products, I spend my weekends turning ideas into reality. Over
                the past year, I&apos;ve brought to life over 10 projects, each
                a testament to my love for innovation and problem-solving.
              </p>
              <p className="indent-4 mt-1 antialiase text-stone-600">
                But this blog is more than just a project—it&apos;s a showcase
                of my journey as a developer. Here, I delve into the
                intersection of technology and storytelling, utilizing Notion as
                my CMS to weave together my thoughts, experiences, and insights.
                <Link
                  className="text-yellow-500"
                  href="https://www.sideprojectss.com/Utkarshn10"
                >
                  {" "}See what I am building{" "}
                </Link>
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {posts.map((post, index) => {
                return (
                  <li
                    key={index}
                    className="flex flex-col justify-center items-center hover:cursor-pointer"
                  >
                    <Link href="/[slug]" as={`/${post?.id}`}>
                      <Image
                        width={270 * 2}
                        height={100}
                        priority
                        src={post?.heroImage}
                        alt={post?.slug}
                        className="rounded-xl border border-yellow-200"
                      />
                      <h2 className="my-4 flex text-center text-lg font-semibold text-stone-700">
                        {post?.title}
                      </h2>
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