import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuthStore } from "@/stores/authStore";

const schema = z
  .object({
    name: z.string().min(2, "Informe seu nome"),
    email: z.string().email("Informe um email valido"),
    password: z.string().min(6, "Senha precisa ter no minimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
    acceptTerms: z.boolean().refine((val) => val, "Aceite os termos")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas nao conferem",
    path: ["confirmPassword"]
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { acceptTerms: false }
  });

  const passwordValue = watch("password");
  const strength = passwordValue?.length >= 10 ? "Forte" : passwordValue?.length >= 6 ? "Media" : "Fraca";

  const onSubmit = async (values: FormValues) => {
    try {
      await registerUser(values.name, values.email, values.password);
      toast.success("Conta criada! Voce ganhou 10 creditos gratis");
      navigate("/app");
    } catch {
      toast.error("Falha ao criar conta");
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Crie sua conta</h1>
          <p className="text-sm text-text-muted">Ganhe 10 creditos gratis para testar.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome completo"
            placeholder="Seu nome"
            leftIcon={<User size={16} className="text-text-muted" />}
            error={errors.name?.message}
            {...register("name")}
          />
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
            placeholder="Crie uma senha"
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
            helperText={`Forca da senha: ${strength}`}
            error={errors.password?.message}
            {...register("password")}
          />
          <Input
            label="Confirmar senha"
            type={showPassword ? "text" : "password"}
            placeholder="Repita sua senha"
            leftIcon={<Lock size={16} className="text-text-muted" />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <label className="flex items-start gap-2 text-sm text-text-muted">
            <input type="checkbox" className="mt-1 rounded border-border-default bg-bg-input" {...register("acceptTerms")} />
            <span>
              Aceito os <span className="font-medium text-primary-300">termos de uso</span>.
            </span>
          </label>
          {errors.acceptTerms ? <p className="text-xs text-error-500">{errors.acceptTerms.message}</p> : null}
          <Button type="submit" fullWidth loading={isSubmitting}>
            Criar conta
          </Button>
        </form>
        <p className="text-center text-sm text-text-muted">
          Ja tem conta?{" "}
          <Link to="/login" className="font-semibold text-primary-300 hover:text-primary-200">
            Entrar
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
