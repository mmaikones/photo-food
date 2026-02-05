import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { useCreditsStore } from "@/stores/creditsStore";
import { getTransactions, purchaseCredits } from "@/services/creditsService";

interface TransactionItem {
  id: string;
  description: string;
  amount: number;
  type: string;
  created_at: string;
}

const packages = [
  { id: "50", credits: 50, price: "R$ 29" },
  { id: "120", credits: 120, price: "R$ 59", highlight: "Mais vendido" },
  { id: "300", credits: 300, price: "R$ 129", highlight: "Melhor custo" }
];

export default function CreditsPage() {
  const { balance, fetchBalance, updateBalance, loading: balanceLoading } = useCreditsStore();
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    fetchBalance();
    setLoadingTransactions(true);
    getTransactions()
      .then((response) => setTransactions(response.data.transactions || []))
      .catch(() => toast.error("Nao foi possivel carregar transacoes"))
      .finally(() => setLoadingTransactions(false));
  }, [fetchBalance]);

  const handlePurchase = async (packageId: string) => {
    setLoading(true);
    try {
      const response = await purchaseCredits(packageId);
      updateBalance(response.data.balance);
      const updated = await getTransactions();
      setTransactions(updated.data.transactions || []);
      toast.success("Creditos adicionados com sucesso");
    } catch {
      toast.error("Falha ao comprar creditos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Creditos</h1>
        <p className="text-sm text-text-muted">Gerencie seu saldo e historico.</p>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted">Saldo atual</p>
            {balanceLoading ? (
              <Skeleton className="mt-2 h-9 w-20" />
            ) : (
              <div className="mt-2 text-3xl font-bold text-white">{balance}</div>
            )}
          </div>
          <Button variant="secondary">Comprar creditos</Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-white">Historico de transacoes</h2>
        <div className="mt-4 space-y-3">
          {loadingTransactions ? (
            <>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </>
          ) : (
            transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg border border-border-subtle px-4 py-3">
                <div>
                  <div className="text-sm font-semibold text-white">{tx.description}</div>
                  <div className="text-xs text-text-muted">{new Date(tx.created_at).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${tx.amount > 0 ? "text-success" : "text-error-500"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount}
                  </div>
                  <div className="text-xs text-text-subtle">{tx.type}</div>
                </div>
              </div>
            ))
          )}
          {!loadingTransactions && transactions.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border-subtle p-6 text-center text-sm text-text-muted">
              Nenhuma transacao registrada ainda.
            </div>
          ) : null}
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-white">Comprar creditos</h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-3">
          {packages.map((pack) => (
            <Card key={pack.id} className="relative">
              {pack.highlight ? <Badge variant="accent" className="absolute right-5 top-5">{pack.highlight}</Badge> : null}
              <div className="text-sm text-text-muted">Pacote</div>
              <div className="mt-2 text-3xl font-bold text-white">{pack.credits}</div>
              <div className="text-sm text-text-muted">creditos</div>
              <div className="mt-4 text-2xl font-semibold text-white">{pack.price}</div>
              <Button className="mt-6 w-full" onClick={() => handlePurchase(pack.id)} loading={loading}>
                Comprar
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
