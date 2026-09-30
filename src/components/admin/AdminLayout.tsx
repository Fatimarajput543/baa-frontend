import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ExternalLink, LogOut } from "lucide-react";
import logo from "@/assets/images/baa-logo.svg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

// Standalone shell for the admin area: no public header/footer.
const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <header className="sticky top-0 z-40 border-b border-[#E3E8F0] bg-white">
        <div className="mx-auto flex h-[7rem] max-w-[128rem] items-center justify-between gap-[1.6rem] px-[2rem] md:px-[4rem]">
          <div className="flex items-center gap-[1.6rem]">
            <img src={logo} alt="BAA" className="h-[3.6rem]" />
            <span className="hidden h-[2.8rem] w-px bg-[#D6DCE6] sm:block" />
            <span className="hidden text-[1.6rem] font-medium text-[#0B3558] sm:block">
              Admin panel
            </span>
          </div>

          <div className="flex items-center gap-[1rem]">
            <Button variant="transparent" asChild>
              <NavLink to="/careers" target="_blank" rel="noreferrer">
                <ExternalLink className="size-[1.6rem]" />
                <span className="hidden sm:inline">View careers page</span>
              </NavLink>
            </Button>
            <Button variant="dark" onClick={logout}>
              <LogOut className="size-[1.6rem]" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
};

export default AdminLayout;
