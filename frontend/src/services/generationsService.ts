import api from "./api";

export async function createGeneration(formData: FormData) {
  const { data } = await api.post("/api/generations", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
}

export async function listGenerations() {
  const { data } = await api.get("/api/generations");
  return data;
}

export async function getGeneration(id: string) {
  const { data } = await api.get(`/api/generations/${id}`);
  return data;
}

export async function retryGeneration(id: string) {
  const { data } = await api.post(`/api/generations/${id}/retry`);
  return data;
}
