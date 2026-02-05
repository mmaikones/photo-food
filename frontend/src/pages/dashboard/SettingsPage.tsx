import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/stores/authStore";
import { getMe } from "@/services/authService";

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    getMe().then((response) => {
      setUser(response.data.user);
      setName(response.data.user.name);
      setEmail(response.data.user.email);
    });
  }, [setUser]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configuracoes</h1>
        <p className="text-sm text-text-muted">Gerencie sua conta e notificacoes.</p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-white">Perfil</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input label="Nome" placeholder="Seu nome" value={name} onChange={(event) => setName(event.target.value)} />
          <Input label="Email" placeholder="voce@email.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <Button className="mt-4">Salvar alteracoes</Button>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-white">Senha</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input label="Senha atual" type="password" placeholder="********" />
          <Input label="Nova senha" type="password" placeholder="Nova senha" />
        </div>
        <Button className="mt-4" variant="secondary">
          Atualizar senha
        </Button>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-white">Notificacoes</h2>
        <div className="mt-4 space-y-3 text-sm text-text-muted">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded border-border-default bg-bg-input" />
            Receber novidades e dicas por email
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-border-default bg-bg-input" />
            Receber alertas de geracao
          </label>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-white">Plano</h2>
        <p className="text-sm text-text-muted">Plano atual: Free</p>
        <Button className="mt-4">Fazer upgrade</Button>
      </Card>
    </div>
  );
}
