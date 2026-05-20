import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const Home = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("fakestore_user") || sessionStorage.getItem("fakestore_user") || "";

  return (
    <div className="min-h-screen bg-neutral-100">
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6">
        <div className="bg-white rounded-md shadow-2xl p-12 text-center max-w-lg w-full">
          <h1 className="text-4xl font-extrabold !text-black mb-4">
            Bienvenido{user ? `, ${user}` : ""}
          </h1>
          <p className="text-neutral-600 mb-8">
            Explora las funcionalidades y disfruta de la experiencia.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2.5 rounded-md bg-purple-700 text-white font-bold hover:bg-purple-800 transition-colors"
          >
            Ver productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;