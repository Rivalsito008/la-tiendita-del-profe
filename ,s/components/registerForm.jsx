import { useState } from "react";

export function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre, email, password, confirmPassword });
  };

  return (
    <section className="flex-1 flex flex-col justify-center px-12">
      <h1 className="text-4xl font-extrabold !text-black mb-8">
        Regístrate
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xs">
        <input
          type="text"
          placeholder="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-neutral-200 text-neutral-800 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-neutral-200 text-neutral-800 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="password"
          placeholder="contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-neutral-200 text-neutral-800 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="password"
          placeholder="contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-neutral-200 text-neutral-800 placeholder:text-neutral-500 outline-none focus:ring-2 focus:ring-purple-600"
        />
        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-md bg-purple-700 text-white font-bold hover:bg-purple-800 transition-colors"
          >
            Regístrate
          </button>
        </div>
      </form>
    </section>
  );
}