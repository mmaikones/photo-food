import api from "./api";

export async function getBalance() {
  const { data } = await api.get("/api/credits/balance");
  return data;
}

export async function getTransactions() {
  const { data } = await api.get("/api/credits/transactions");
  return data;
}

export async function purchaseCredits(packageId: string) {
  const { data } = await api.post("/api/credits/purchase", { packageId });
  return data;
}
