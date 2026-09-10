import { Button } from "@intibank/ui";
import { ArrowRightIcon } from "@intibank/ui/icons";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@intibank/ui/styles.css";
import "./theme.css";

function App() {
  return (
    <main className="example-shell">
      <p>Esta aplicación no instala ni configura Tailwind.</p>
      <Button>
        <ArrowRightIcon aria-hidden="true" />
        Transferir
      </Button>
    </main>
  );
}

const root = document.querySelector("#root");
if (!root) {
  throw new Error("Missing #root element");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
