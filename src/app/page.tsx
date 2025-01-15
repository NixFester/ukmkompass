import MainLayout from "./component/layout/MainLayout";

const fetchIsiBlog = async (): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/isiblog`, {
    next: { revalidate: Number(process.env.REVTIME) }, // Revalidate every 60 seconds
  });
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data: IIsiBlog[] = await res.json();
  return data.sort((a, b) => Number(b.id) - Number(a.id));
}

export default async function Page() {
  const isiBlog = await fetchIsiBlog();
  return (
    <div>
      <MainLayout Kategori={1} isiBlog={isiBlog} />
    </div>
  )
}