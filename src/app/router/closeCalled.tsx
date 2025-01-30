import { api } from "@/lib/axios";
import { useState } from "react";

export function FecharChamadoButton({ uidEmail, answer, attachment }: {
    uidEmail: string;
    answer: string;
    attachment?: File;
  }) {
    const [isLoading, setIsLoading] = useState(false);
  
    const fecharChamado = async () => {
      setIsLoading(true);
      try {
        // Faz uma requisição GET para a rota `/called/close` com `uidEmail` e `answer`
        const response = await api.get(`/called/close`, {
          params: { uidEmail, answer }
        });
  
        console.log(response.data); // Exibe a resposta do servidor no console
        alert("Chamado fechado com sucesso");
      } catch (error) {
        console.error("Erro ao fechar chamado:", error);
        alert("Erro ao fechar chamado");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <button onClick={fecharChamado} disabled={isLoading}>
        {isLoading ? 'Fechando...' : 'Fechar Chamado'}
      </button>
    );
  }

// export function FecharChamadoButton({ uidEmail, answer, attachment }) {
//     const fecharChamado = async () => {
//         try {
//             const uidEmail = "26510"; // Exemplo de valor para `uidEmail`
//             const answer = "test"; // Exemplo de valor para `answer`

//             // Faz uma requisição GET para a rota `/called/close` com `uidEmail` e `answer`
//             const response = await api.get(`/called/close`, {
//                 params: { uidEmail, answer }
//             });

//             console.log(response.data); // Exibe a resposta do servidor no console
//             alert("Chamado fechado com sucesso");
//         } catch (error) {
//             console.error("Erro ao fechar chamado:", error);
//             alert("Erro ao fechar chamado");
//         }
//     };

// }