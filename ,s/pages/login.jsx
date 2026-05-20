import { LoginForm } from "../components/LoginForm";
import { WelcomePanel } from "../components/WelcomePanel";

function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-900 p-6">
      <div className="relative w-full max-w-4xl h-[520px] bg-white rounded-md overflow-hidden shadow-2xl flex">
        <LoginForm />
        <WelcomePanel />
      </div>
    </main>
  );
}

export default Login;