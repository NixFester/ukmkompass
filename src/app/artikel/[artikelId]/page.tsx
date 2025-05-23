import BlogPostLayout from "@/app/component/layout/BlogPostLayout";

export const revalidate = 300

const fetchIsiBlog = async (): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/isiblog`);
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data: IIsiBlog[] = await res.json();
  return data.sort((a, b) => Number(b.id) - Number(a.id));
}

export default async function Artikel({
  params,
}: {
  params: Promise<{ artikelId: string }>
}) {
  const slug = (await params).artikelId
  if (slug) {
    const isiBlog = await fetchIsiBlog();
    return (
      <BlogPostLayout targetArticle={isiBlog} id={slug} jenis="Artikel"/>
    );
  }
  return <p>loading</p>
  
}
