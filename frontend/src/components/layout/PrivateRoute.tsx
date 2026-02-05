import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import Spinner from "@/components/ui/Spinner";
import { getMe } from "@/services/authService";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setUser } = useAuthStore();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (!isAuthenticated && token) {
      getMe()
        .then((response) => setUser(response.data.user))
        .catch(() => {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        });
    }
  }, [isAuthenticated, setUser, token]);

  if (!isAuthenticated && token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-page">
        <Spinner size="lg" color="#6366f1" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
