import { NavLink } from "react-router-dom";
import jugoLogo from "../../assets/jugo.svg";

const navLinkBase =
  "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200";

const Navbar = () => {
  return (
    <header className="w-full border-b border-[var(--color-border)] bg-[var(--color-white)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={jugoLogo}
            alt="Jugo logo"
            className="h-10 w-40 object-contain"
          />

          {/* <span className="text-xl font-semibold text-[var(--color-dark)]">
            IBCS Checker
          </span> */}
        </div>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkBase} ${
                isActive
                  ? "bg-[var(--color-background)] text-[var(--color-primary)]"
                  : "text-[var(--color-dark)] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/analyze"
            className={({ isActive }) =>
              `${navLinkBase} ${
                isActive
                  ? "bg-[var(--color-background)] text-[var(--color-primary)]"
                  : "text-[var(--color-dark)] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]"
              }`
            }
          >
            Analyze
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
