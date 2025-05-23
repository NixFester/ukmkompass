import BlogPostLayout from "@/app/component/layout/BlogPostLayout";

export const revalidate = 300

const fetchIsiBlog = async (): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/isiblog`);
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
    const isiBlog:IIsiBlog = await fetchIsiBlog();
    return (
      <BlogPostLayout targetArticle={isiBlog} id={slug} jenis="Sastra"/>
    );
  }
  
}
