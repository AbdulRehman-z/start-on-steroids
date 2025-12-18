import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div>
      <h1>Start On Steroids</h1>
      <p>Welcome to Start On Steroids!</p>
    </div>
  );
}
