import { api } from "@/lib/axios";

export async function fetchCalleds() {
    try {
        const response = await api.get('/calleds'); // Use .get em vez de .fetch
        return response.data; // Axios retorna os dados diretamente no `data`

    } catch (error) {
        console.error('Erro ao buscar chamados:', error);
        throw new Error('Erro ao buscar chamados');
    }
}
