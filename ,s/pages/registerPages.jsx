import { HelloPanel } from "../components/helloPanel";
import { RegisterForm } from "../components/registerForm";

function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-900 p-6">
      <div className="relative w-full max-w-4xl h-[520px] bg-white rounded-md overflow-hidden shadow-2xl flex">
        <HelloPanel />
        <RegisterForm />
      </div>
    </main>
  );
}

export default RegisterPage;