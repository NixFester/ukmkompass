import MainLayout from "../component/layout/MainLayout";

export const revalidate = 300


const fetchIsiBlog = async (): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/isiblog`);
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data: IIsiBlog[] = await res.json();
  return data.sort((a, b) => Number(b.id) - Number(a.id));
}
export default async function Page(){
  const isiBlog = await fetchIsiBlog();
  return (
    <div>
      <MainLayout Kategori={2} isiBlog={isiBlog}/>
    </div>
  );
}
