import { useNavigate } from "react-router";

export function HelloPanel() {
  const navigate = useNavigate();
    return (
      <section
        className="w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center px-10 text-center"
        style={{ borderTopRightRadius: "60% 50%", borderBottomRightRadius: "60% 50%" }}
      >
        <h2 className="text-3xl font-extrabold mb-4">¡Hola! Vamos a organizar tu día</h2>
        <p className="text-sm mb-6 max-w-xs leading-relaxed">
          Registra tus datos personales y toma el control de tu día en un par de clics.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 rounded-md bg-purple-700 border-2 border-white/70 text-white font-bold hover:bg-purple-800 transition-colors"
        >
          Inicia sesión
        </button>
      </section>
    );
  }