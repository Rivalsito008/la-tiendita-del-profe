import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <section className="flex-1 flex flex-col justify-center px-12">
      <h1 className="text-4xl font-extrabold !text-black mb-8">
        Inicia sesión
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xs">
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
        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-md bg-purple-700 text-white font-bold hover:bg-purple-800 transition-colors"
          >
            Inicia sesión
          </button>
        </div>
      </form>
    </section>
  );
}