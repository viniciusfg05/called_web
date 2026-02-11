import Header from "@/components/head/page";
import Search from "@/components/search";
import Navbar from "@/components/navbar/page";
import Summary from "@/components/summary";
import CardCalled from "@/components/card-called/card-called";

interface RootPageProps {
  params: Promise<Record<string, string>>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GetCalled({ params, searchParams }: RootPageProps) {
  // params não utilizado intencionalmente nesta página raiz
  await params;
  const sp = await searchParams;
  const categoryParam = sp?.category;
  const raw = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const activeCategory = raw ?? null;
  const category = raw === "__null__" ? null : raw;

  const search = (() => {
    const value = sp?.search;
    return Array.isArray(value) ? value[0] : value;
  })();

  return (
    <div className="containerHome">
      <div className="contenteHome">
        <Header />
        <Search />
        <CardCalled search={search} />
      </div>
    </div>
  );
}
