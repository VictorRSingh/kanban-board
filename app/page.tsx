import LoginPage from "./components/login/LoginPage";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans gap-y-6 p-2 lg:max-w-1/4 md:max-w-2/4 mx-auto">
      <h1 className="w-full text-3xl font-bold">Kanban Board</h1>
      <LoginPage />
    </div>
  );
}
