import { prisma } from "@/utils/prisma";
import "./card-called.css";
import { formattedDateCut } from "@/utils/formatData";
import { CardCalledActions } from "./card-called-actions";

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
  newCalled?: boolean;
}

export default async function CardCalled({ uf, modalidade, category, search, newCalled }: CardCalledProps) {
  let data: Called[] = [];

  if (!newCalled) {
    const trimmedSearch = (search ?? "").trim();

    const whereClause: any = {
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
      // Se modalidade for um único valor
      whereClause.scope = modalidade;
    }

    if (category !== undefined) {
      whereClause.category = category === null ? null : category;
    }

    if (trimmedSearch.length > 0) {
      whereClause.OR = [
        { branch: { contains: trimmedSearch } },
        { description: { contains: trimmedSearch } },
        { descriptionSummary: { contains: trimmedSearch } },
        { store: { contains: trimmedSearch } },
        { called: { contains: trimmedSearch } },
        { status: { contains: trimmedSearch } },
      ];
    } else {
      // Busca padrão
      whereClause.status = "Pendente";
    }

    const calledData = await prisma.called.findMany({
      where: whereClause,
      orderBy: { created_at: "desc" },
    });

    // Ordenação personalizada por status
    const statusOrder = (status: string) => {
      switch (status) {
        case "Pendente": return 0;
        case "Orçamento": return 1;
        case "Resolvido":
        case "Fechado": return 2;
        default: return 3;
      }
    };

    data = calledData.sort((a, b) => statusOrder(a.status) - statusOrder(b.status));

  } else {
    // Caso newCalled seja true
    const calleds = await prisma.called.findMany({
      where: { callSendingStatus: null },
      orderBy: { created_at: "desc" },
    });
    data = calleds;
  }

  // Agora `data` está preenchido


  return (
    <div className="containerCalled">
      {data.map((called: any) => (
        <div
          key={called.id}
          className="contentCalled"
          style={{
            backgroundColor:
              called.status === "Pendente"
                ? "#262626"
                : called.status === "Orçamento"
                  ? "#473502"
                  : called.status === "Resolvido" || called.status === "Fechado"
                    ? "#024347"
                    : "#024347"
          }}
        >
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
              <CardCalledActions id={called.id} />

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


