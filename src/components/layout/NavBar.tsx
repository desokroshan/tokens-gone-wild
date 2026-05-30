import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAnalysisStore } from "../../store/analysisStore";
import logo from "../../assets/logo.png";

const NAV_LINKS = [
  { to: "/insights", label: "Insights" },
  { to: "/roadmap", label: "Roadmap" },
];

export function NavBar() {
  const location = useLocation();
  const result = useAnalysisStore((s) => s.result);
  const isActive = result !== null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgb(221 221 221 / 99%)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Link
        to="/"
        className="flex items-center no-underline cursor-pointer"
        onClick={() => useAnalysisStore.getState().reset()}
      >
        <img src={logo} alt="Tokens Gone Wild" className="h-12 w-auto" />
      </Link>

      <div className="flex items-center gap-1">
        {NAV_LINKS.map(({ to, label }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={[
                "relative px-4 py-1.5 rounded-md text-sm font-medium transition-colors no-underline",
                isActive
                  ? "text-black/70 hover:text-white"
                  : "text-black/25 cursor-not-allowed pointer-events-none",
                active && isActive ? "text-black" : "",
              ].join(" ")}
            >
              {active && isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-md"
                  style={{
                    background: "rgba(201,140,46,0.14)",
                    border: "1px solid rgba(201,140,46,0.28)",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
