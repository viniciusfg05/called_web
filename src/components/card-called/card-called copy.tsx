// import { prisma } from "@/utils/prisma";
// import "./card-called.css";
// import { formattedDateCut } from "@/utils/formatData";
// import { Called, MessageCalled } from "@prisma/client";
// import * as Accordion from "@radix-ui/react-accordion";
// import { ChevronDownIcon } from "@radix-ui/react-icons";
// import { CardCalledActions } from "./card-called-actions";

// // interface Called {
// //   id: string;
// //   description?: string;
// //   status?: string;
// //   priority?: string;
// //   created_at?: Date;
// //   descriptionSummary: string;
// //   called: string;
// // }

// interface Scope {
//   scope: string;
//   calleds: Called[];
// }

// interface Branch {
//   branch: string;
//   scopes: Scope[];
//   store: string;
// }

// interface CardCalledProps {
//   uf?: string;
//   modalidade?: string;
//   category?: string | null;
//   search?: string;
// }

// export default async function CardCalled({ }: CardCalledProps) {




//   const calledData = await prisma.called.findMany({
//     where: {
//       callSendingStatus: null
//     },
//     orderBy: {
//       created_at: "desc",
//     },
//     include: {
//       messageCalled: true,
//     },
//   });

//   const historyBrachs = await prisma.historyBranchs.findMany({
//     where: {},


//   });

//   // Ordenação personalizada por status
//   const statusOrder = (status: string) => {
//     if (status === "Pendente") return 0;
//     if (status === "Orçamento") return 1;
//     if (status === "Resolvido" || status === "Fechado") return 2;
//     // if (status === "Resolvido" || status === "Fechado") return 2;
//     return 3;
//   };

//   calledData.sort((a, b) => statusOrder(a.status) - statusOrder(b.status));

//   return (
//     <div className="containerCalled">
//       {calledData.map((called: Called & { messageCalled: MessageCalled[] }) => (
//         <div
//           key={called.id}
//           className="contentCalled"
//           style={{
//             backgroundColor:
//               called.status === "Pendente"
//                 ? "#262626"
//                 : called.status === "Orçamento"
//                   ? "#473502"
//                   : called.status === "Resolvido" || called.status === "Fechado"
//                     ? "#024347"
//                     : "#024347"
//           }}
//         >
//           <div className="contentCalledHeader">
//             <div className="contentCalledHeaderInfo">
//               <div className="contentCalledHeaderBranch"><strong>{called.branch}</strong></div>
//               <div className="contentCalledHeaderBranch"><strong>{called.store}</strong></div>
//               <div className="contentCalledHeaderBranch"><strong>{called.called}</strong></div>
//               <div className="contentCalledHeaderBranch"><p>{called.scope}</p></div>
//               <div className="contentCalledHeaderBranch"><p>{called.status}</p></div>
//               <div className="contentCalledHeaderBranch"><p>{formattedDateCut(called.created_at.toString())}</p></div>
//             </div>
//             <CardCalledActions id={called.id} />
//           </div>

//           <div className="contentCalledBody">
//             <div className="contentCalledBodySummary">
//               <p>{called.descriptionSummary}</p>
//             </div>
//             <div className="contentCalledBodyDescription">
//               <p>{called.description}</p>
//             </div>
//           </div>

//           {called.messageCalled.length > 0 && (
//             <Accordion.Accordion type="single" collapsible>
//               <Accordion.AccordionItem value="mensagens">
//                 <Accordion.AccordionHeader>
//                   <Accordion.AccordionTrigger className="contentCalledBodyDescription">
//                     <ChevronDownIcon className="AccordionChevron" aria-hidden width={25} height={25} />
//                   </Accordion.AccordionTrigger>
//                 </Accordion.AccordionHeader>
//                 <Accordion.AccordionContent>
//                   {called.messageCalled.map((message: MessageCalled) => (
//                     <>
//                       <p>{message.message}</p>
//                       <p>{message.name}</p>
//                       <p>{formattedDateCut(message.data.toString())}</p>
//                     </>
//                   ))}
//                 </Accordion.AccordionContent>
//               </Accordion.AccordionItem>
//             </Accordion.Accordion>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }