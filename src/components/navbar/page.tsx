import Link from "next/link";
import "./page.css";
import { prisma } from "@/utils/prisma";

interface NavbarProps {
  uf?: string;
  modalidade?: string;
  activeCategory?: string | null;
  activeScope?: string | null;
}

export default async function Navbar({ uf, modalidade, activeCategory, activeScope }: NavbarProps) {
  const bannedScopes = ["Fora do escopo", "noScope"]; 

  const andFilters: any[] = [{ status: "Pendente" }];
  if (uf) andFilters.push({ uf });
  andFilters.push({ scope: { notIn: bannedScopes } });
  if (modalidade) andFilters.push({ scope: modalidade });

  const isUFOnly = Boolean(uf && !modalidade);
  const groupField: "category" | "scope" = isUFOnly ? "scope" : "category";

  const grouped: any[] = await prisma.called.groupBy({
    by: [groupField as any],
    _count: { _all: true },
    where: { AND: andFilters },
  } as any);

  let items = grouped.map((g: any) => ({
    value: (g as any)[groupField] ?? null,
    count: g._count?._all ?? 0,
  })) as Array<{ value: string | null; count: number }>;

  if (groupField === "scope") {
    items = items.filter((i) => i.value !== null);
  }

  items.sort((a, b) => b.count - a.count);

  const activeValue = groupField === "scope" ? (activeScope ?? modalidade ?? null) : activeCategory;

  const buildHref = (value: string | null) => {
    if (groupField === "scope") {
      if (!uf) return "?";
      if (!value) return `/getCalleds/${encodeURIComponent(uf)}`;
      return `/getCalleds/${encodeURIComponent(uf)}/${encodeURIComponent(value)}`;
    }
    if (value === null) return `?category=__null__`;
    return `?category=${encodeURIComponent(value)}`;
  };

  const buildTodosHref = () => (groupField === "scope" && uf ? `/getCalleds/${encodeURIComponent(uf)}` : "?");

  const showTodos = groupField !== "scope";

  return (
    <div className="container">
      {showTodos && (
        <Link className="link" href={buildTodosHref()} aria-pressed={!activeValue}>
          <span>TODOS</span>
        </Link>
      )}

      {items.map((item, index) => {
        const name = item.value ?? (groupField === "scope" ? "Sem escopo" : "Sem categoria");
        const href = buildHref(item.value);
        const isActive = activeValue === item.value;

        return (
          <Link
            key={`${name}-${index}`}
            className="link"
            href={href}
            aria-pressed={isActive}
            title={`${name} - ${item.count}`}
          >
            <span>{name.toUpperCase()}</span>
            <strong>{` - ${item.count}`}</strong>
          </Link>
        );
      })}
    </div>
  );
}
