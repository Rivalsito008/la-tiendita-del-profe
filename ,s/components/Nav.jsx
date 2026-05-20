import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("fakestore_token");
    localStorage.removeItem("fakestore_user");
    localStorage.removeItem("fakestore_email");
    sessionStorage.removeItem("fakestore_token");
    sessionStorage.removeItem("fakestore_user");
    sessionStorage.removeItem("fakestore_email");
    navigate("/");
  };

  return (
    <nav className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-extrabold tracking-tight">La tiendita del profe BD</div>
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/home" className="font-bold hover:text-purple-200 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="font-bold hover:text-purple-200 transition-colors">
              Productos
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md border-2 border-white/70 font-bold hover:bg-purple-800 transition-colors"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;