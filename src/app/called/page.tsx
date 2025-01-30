"use client";

import { useEffect, useState } from "react";
import "./page.css";
import { fetchCalleds } from "../router/fetchCalleds";
import { FecharChamadoButton } from "../router/closeCalled";
import DialogDemo from "./modal";

interface CalledProps {
  id: string;
  uid: string;
  called: string;
  description: string;
  branch: string;
  dataOpen: string;
  created_at: Date;
  priority: string;
  emergency: string;
  scope: string;
  status: string;
  descriptionSummary: string;
  uf: string;
  messageCalled: {
    id: string;
    name: string;
    data: string;
    message: string;
    calledId: string;
  }[];
}

export default function Called() {
  const [calleds, setCalleds] = useState<CalledProps[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCalleds();
        setCalleds(data);
      } catch (error) {
        console.error("Erro ao carregar chamados:", error);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <div className="containerCalled">
        <div className="contenteCalled">
          {calleds.map((calleds) => (
            <div className="cardCalled">
              <div className="headCalled">
                <header>
                  <strong>{calleds.called}</strong>
                  <strong>{calleds.branch} Araguaina 5</strong>

                  <p>{calleds.descriptionSummary}</p>

                  <p>Dias aberto 10</p>

                  <p>Preventiva</p>

                  <strong>Resolvido</strong>
                </header>
              </div>

              <div className="conteinerMain">
                <div className="contentMain">
                  <div className="ContentDescription">
                    <div className="descriptionCalled">
                      <span>{calleds.description}</span>
                    </div>
                  </div>

                  <div className="noteCalled">
                    <div>
                      <strong>Anotações</strong>
                      {/* {calleds.messageCalled.map((messagens) => ( */}
                        <div className="noteContenteCalled">
                          <p>
                            {calleds.messageCalled[0]?.data} - {calleds.messageCalled[0]?.name}{" "}
                          </p>
                          <span>{calleds.messageCalled[0]?.message}</span>
                        </div>
                      {/* ))} */}
                    </div>
                  </div>
                </div>

                <div className="buttonCalled">
                  <button>F</button>
                  <button>F</button>
                  <button>F</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
