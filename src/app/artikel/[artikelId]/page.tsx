import BlogPostLayout from "@/app/component/layout/BlogPostLayout";


const fetchIsiBlog = async (id:string): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/isiblog/${id}`);
  const data:IIsiBlog = await res.json();
  return data
}

export default async function Artikel({
  params,
}: {
  params: Promise<{ artikelId: string }>
}) {
  const slug = (await params).artikelId
  if (slug) {
    const isiBlog:IIsiBlog = await fetchIsiBlog(slug);
    return (
      <BlogPostLayout targetArticle={isiBlog} id={slug} jenis="Artikel"/>
    );
  }
  return <p>loading</p>
  
}
