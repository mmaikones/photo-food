import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "@/components/layout/PrivateRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Spinner from "@/components/ui/Spinner";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPasswordPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const NewGenerationPage = lazy(() => import("@/pages/dashboard/NewGenerationPage"));
const GenerationResultPage = lazy(() => import("@/pages/dashboard/GenerationResultPage"));
const MyPhotosPage = lazy(() => import("@/pages/dashboard/MyPhotosPage"));
const CreditsPage = lazy(() => import("@/pages/dashboard/CreditsPage"));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage"));
const CollectionsPage = lazy(() => import("@/pages/dashboard/CollectionsPage"));
const EditorPage = lazy(() => import("@/pages/dashboard/EditorPage"));
const TemplatesPage = lazy(() => import("@/pages/dashboard/TemplatesPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function AppLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-page">
      <Spinner size="lg" color="#6366f1" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="nova-foto" element={<NewGenerationPage />} />
          <Route path="geracao/:id" element={<GenerationResultPage />} />
          <Route path="minhas-fotos" element={<MyPhotosPage />} />
          <Route path="colecoes" element={<CollectionsPage />} />
          <Route path="editor" element={<EditorPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="creditos" element={<CreditsPage />} />
          <Route path="configuracoes" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
