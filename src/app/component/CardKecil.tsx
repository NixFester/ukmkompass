
const fetchIsiBlog = async (): Promise<IIsiBlog[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/isiblog`, {
    next: { revalidate: Number(process.env.REVTIME) }, // Revalidate every 60 seconds
  });
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  const data: IIsiBlog[] = await res.json();
  return data.sort((a, b) => Number(b.id) - Number(a.id)).filter(
    (item: ISastra | IArticle) => item.lolosSensor
  );
}


export default async function CardKecil() {
  const isiBlog:IIsiBlog[] = await fetchIsiBlog()
  return (
    <div>
      <div className=" lg:ml-2 lg:w-fit">
        {isiBlog &&
          isiBlog.slice(0, 3).map((artikel) => (
            <div key={artikel.id} className="relative flex flex-col mt-6 bg-white shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-lg transition-all cursor-pointer">
              <a
                className="p-4"
                href={`/${artikel.sastra ? "sastra" : "artikel"}/${artikel.id}`}
              >
                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                  {artikel.title}
                </h5>
                <p className="text-slate-600 leading-normal font-light">
                  {artikel.body.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 200) +
                    "..."}
                </p>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
