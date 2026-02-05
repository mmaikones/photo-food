import api from "./api";

export async function listTemplates() {
  const { data } = await api.get("/api/templates");
  return data;
}

export async function getTemplate(id: string) {
  const { data } = await api.get(`/api/templates/${id}`);
  return data;
}
