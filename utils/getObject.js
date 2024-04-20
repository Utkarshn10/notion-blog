export default function getDataFromObject(post){
  return {
    id: post.id,
    title: post.properties.title?.title[0].plain_text,
    date: post.properties.date?.date?.start,
    slug: post.properties.slug?.rich_text[0]?.plain_text,
    heroImage: post.properties.heroImage?.files?.[0]?.file?.url || post.properties.heroImage?.files?.[0]?.name,
    url: post?.url,
  };
}