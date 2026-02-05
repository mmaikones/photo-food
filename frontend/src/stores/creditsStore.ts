import { create } from "zustand";
import * as creditsService from "@/services/creditsService";

interface CreditsState {
  balance: number;
  loading: boolean;
  fetchBalance: () => Promise<void>;
  updateBalance: (balance: number) => void;
}

export const useCreditsStore = create<CreditsState>((set) => ({
  balance: 0,
  loading: false,
  fetchBalance: async () => {
    set({ loading: true });
    try {
      const response = await creditsService.getBalance();
      set({ balance: response.data.balance, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  updateBalance: (balance) => set({ balance })
}));
