import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/stores/authStore";

const schema = z.object({
  email: z.string().email("Informe um email valido"),
  password: z.string().min(6, "Senha precisa ter no minimo 6 caracteres")
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values.email, values.password);
      toast.success("Login realizado com sucesso");
      navigate("/app");
    } catch {
      toast.error("Email ou senha invalidos");
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Bem-vindo de volta</h1>
          <p className="text-sm text-text-muted">Entre para continuar gerando fotos.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            placeholder="voce@email.com"
            leftIcon={<Mail size={16} className="text-text-muted" />}
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Senha"
            type={showPassword ? "text" : "password"}
            placeholder="Sua senha"
            leftIcon={<Lock size={16} className="text-text-muted" />}
            rightIcon={
              <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <EyeOff size={16} className="text-text-muted" />
                ) : (
                  <Eye size={16} className="text-text-muted" />
                )}
              </button>
            }
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-text-muted">
              <input type="checkbox" className="rounded border-border-default bg-bg-input" />
              Lembrar de mim
            </label>
            <Link to="/esqueci-senha" className="text-primary-300 hover:text-primary-200">
              Esqueceu a senha?
            </Link>
          </div>
          <Button type="submit" fullWidth loading={isSubmitting}>
            Entrar
          </Button>
        </form>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <div className="h-px flex-1 bg-border-subtle" />
            ou continue com
            <div className="h-px flex-1 bg-border-subtle" />
          </div>
          <Button variant="secondary" fullWidth>
            Google (em breve)
          </Button>
        </div>
        <p className="text-center text-sm text-text-muted">
          Nao tem conta?{" "}
          <Link to="/cadastro" className="font-semibold text-primary-300 hover:text-primary-200">
            Criar conta gratis
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
