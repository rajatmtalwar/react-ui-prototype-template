import { Navigate, Routes, Route } from "react-router";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";
import Login from "@/pages/Login";
import { useAuthStore } from "@/stores/auth";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Home />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}
