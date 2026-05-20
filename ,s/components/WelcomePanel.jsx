import { useNavigate } from "react-router";

export function WelcomePanel() {
  const navigate = useNavigate();
    return (
      <section
        className="w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center px-10 text-center"
        style={{ borderTopLeftRadius: "60% 50%", borderBottomLeftRadius: "60% 50%" }}
      >
        <h2 className="text-5xl font-extrabold mb-4">Bienvenido de nuevo</h2>
        <p className="text-sm mb-6 max-w-xs leading-relaxed">
          Deja que nosotros recordemos tus pendientes por ti. Regístrate aquí
          para comenzar
        </p>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-2.5 rounded-md bg-purple-700 border-2 border-white/70 text-white font-bold hover:bg-purple-800 transition-colors"
        >
          Regístrate
        </button>
      </section>
    );
  }