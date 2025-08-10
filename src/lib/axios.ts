import axios from "axios";

export const api = axios.create({
  baseURL: "https://calledv2.called.cloud/",
});

export class ApiService {

  allCalledGoAr(uf: string, modalidade: string | null, category?: string | null, limit: number = 20, offset: number = 0) {
    let url = `/getCalleds/${uf}`;
    if (modalidade) {
      url += `/${modalidade}`;
    }
    const queryParams = new URLSearchParams({ limit: String(limit), offset: String(offset) });
    if (category) queryParams.append("category", category);
  
    url += `?${queryParams.toString()}`;
    return api.get(url);
  }
  // A função agora lida com 'category' como opcional
  allGroupedCalledGoAr(uf: string, modalidade: string | null, category?: string | null, limit: number = 20, offset: number = 0) {
    let url = `/getCalleds/grouped/${uf}`;
    if (modalidade) {
      url += `/${modalidade}`;
    }
    const queryParams = new URLSearchParams({ limit: String(limit), offset: String(offset) });
    if (category) queryParams.append("category", category);
  
    url += `?${queryParams.toString()}`;
    return api.get(url);
  }
  

  allCategories() {
    const categories = api.get("/getCalleds/categories")

    return categories
  }

  getSubCategoriesByRegionAndModality(uf: string, modalidade: string | null) {
    const url = `/getCalleds/subcategories/${uf}/${modalidade || ''}`;
    return api.get(url);
  }

  getScopes(uf: string) {
    const url = `/getCalleds/scope/${uf}`;
    
    return api.get(url);
  }

}
