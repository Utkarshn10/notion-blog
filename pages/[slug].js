import { useRouter } from "next/router"
import { Client } from "@notionhq/client"
import { useEffect, useState } from "react"

const NOTION_BLOG_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_ID
const NOTION_KEY = process.env.NEXT_PUBLIC_NOTION_KEY
const notionClient = new Client({auth: NOTION_KEY})

export default function BlogContent(){
    const router = useRouter();
    const [postData, setPostData] = useState({})

    const getData = async () => {
      const { slug } = router.query;
      console.log(router.query, " ", slug);
      const parts = slug?.split("/");
      const id = parts[parts.length - 1];
      console.log(id);
    const pageData = await notionClient.databases.query({
      database_id: NOTION_BLOG_ID,
     
    });

      console.log(pageData);
      setPostData(pageData);
    };

    useEffect(()=>{
        if(router.query.slug){
          getData();
        }
    },[router.query.slug])
    console.log(postData)
    return(
        <main className="min-h-screen">
            <section className="">
            {/* <Image */}
            </section>
        </main>
    )
}