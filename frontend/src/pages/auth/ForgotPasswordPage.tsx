import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const schema = z.object({
  email: z.string().email("Informe um email valido")
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success("Link enviado para seu email");
    navigate("/login");
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Recuperar senha</h1>
          <p className="text-sm text-text-muted">Vamos enviar um link para seu email.</p>
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
          <Button type="submit" fullWidth loading={isSubmitting}>
            Enviar link de recuperacao
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
