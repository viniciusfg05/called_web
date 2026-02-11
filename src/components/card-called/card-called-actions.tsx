"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

interface CardCalledActionsProps {
    id: string;
}

export function CardCalledActions({ id }: CardCalledActionsProps) {
    const router = useRouter();

    async function handleSend(scope: 'predial' | 'ar' | 'corretiva') {
        console.log(scope);
        try {
            const url = `/att-status-send-gruoup/${id}/${scope}`;
            console.log(url);


            await api.get(url);
            alert("Status atualizado com sucesso");
            router.refresh();
        } catch (error: any) {
            console.error("Erro ao atualizar status:", error);
            alert(error.response?.data?.error || "Erro ao atualizar status");
        }
    }

    return (
        <div className="contentCalledHeaderButton">
            <button onClick={() => handleSend('predial')}>Predial</button>
            <button onClick={() => handleSend('ar')}>Ar</button>
            <button onClick={() => handleSend('corretiva')}>Corretiva</button>
        </div>
    );
}
