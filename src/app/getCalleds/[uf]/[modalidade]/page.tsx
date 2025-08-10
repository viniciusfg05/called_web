import Header from "@/components/head/page";
import Search from "@/components/search";
import Navbar from "@/components/navbar/page";
import CardCalled from "@/components/card-called/card-called";

interface ModalidadePageProps {
  params: Promise<{ uf: string; modalidade: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Modalidade({ params, searchParams }: ModalidadePageProps) {
  const { uf, modalidade } = await params;
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
      <Header />
      <Search />
      <Navbar uf={uf} modalidade={modalidade} activeCategory={activeCategory} />
      <CardCalled uf={uf} modalidade={modalidade} category={category ?? undefined} search={search} />
    </div>
  );
}
