import { NavLink, Outlet, useNavigate } from "react-router";
import { LayoutDashboard, CheckSquare, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";

const nav = [
  { to: "/", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/tasks", label: "Tasks", icon: CheckSquare, end: false },
];

export default function AppLayout() {
  const { theme, toggle } = useTheme();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-svh bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 border-r bg-muted/30 p-4 md:flex md:flex-col">
        <div className="mb-6 px-2 text-lg font-semibold tracking-tight">
          Prototype
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="text-sm text-muted-foreground">
            Prototype workspace
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Log out"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
