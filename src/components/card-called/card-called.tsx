import { prisma } from "@/utils/prisma";
import "./card-called.css";
import { formattedDateCut } from "@/utils/formatData";

interface Called {
  id: string;
  description?: string;
  status?: string;
  priority?: string;
  created_at?: Date;
  descriptionSummary: string;
  called: string;
}

interface Scope {
  scope: string;
  calleds: Called[];
}

interface Branch {
  branch: string;
  scopes: Scope[];
  store: string;
}

interface CardCalledProps {
  uf?: string;
  modalidade?: string;
  category?: string | null;
  search?: string;
}

export default async function CardCalled({ uf, modalidade, category, search }: CardCalledProps) {
  const whereClause: any = {
    status: "Pendente",
    scope: {
      not: {
        in: ["Fora do escopo", "noScope"]
      }
    }
  };

  if (uf) {
    whereClause.uf = uf;
  }
  if (modalidade) {
    whereClause.scope = modalidade;
  }
  if (category !== undefined) {
    whereClause.category = category === null ? null : category;
  }

  const trimmedSearch = (search ?? "").trim();
  if (trimmedSearch.length > 0) {
    whereClause.OR = [
      { branch: { contains: trimmedSearch } },
      { description: { contains: trimmedSearch } },
      { descriptionSummary: { contains: trimmedSearch } },
      { store: { contains: trimmedSearch } },
      { called: { contains: trimmedSearch } },
    ];
  }

  const calledData = await prisma.called.findMany({
    where: whereClause,
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <div className="containerCalled">
      {calledData.map((called: any) => (
        <div key={called.id} className="contentCalled">
          <div className="contentCalledHeader">
            <div className="contentCalledHeaderInfo">
              <div className="contentCalledHeaderBranch"><strong>{called.branch}</strong></div>
              <div className="contentCalledHeaderBranch"><strong>{called.store}</strong></div>
              <div className="contentCalledHeaderBranch"><strong>{called.called}</strong></div>
              <div className="contentCalledHeaderBranch"><p>{called.scope}</p></div>
              <div className="contentCalledHeaderBranch"><p>{called.status}</p></div>
              <div className="contentCalledHeaderBranch"><p>{formattedDateCut(called.created_at)}</p></div>
            </div>
            <div className="contentCalledHeaderButton">
              <button>Fechar</button>
              <button>Responder</button>
            </div>
          </div>

          <div className="contentCalledBody">
            <div className="contentCalledBodySummary">
              <p>{called.descriptionSummary}</p>
            </div>
            <div className="contentCalledBodyDescription">
              <p>{called.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
