import { Button, MoneyField, TextField } from "@intibank/ui";
import { ArrowRightIcon } from "@intibank/ui/icons";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@intibank/ui/styles.css";
import "./theme.css";

function App() {
  return (
    <main className="example-shell">
      <p>Esta aplicación no instala ni configura Tailwind.</p>
      <Button variant="secondary">
        <ArrowRightIcon aria-hidden="true" />
        Transferir
      </Button>
      <Button variant="outline">Ver movimientos</Button>
      <TextField
        defaultValue="Pago de Honorarios Proyecto Sol Andino"
        label="Mensaje o Motivo"
        optional
      />
      <MoneyField defaultValue="1250.50" label="Monto" name="amount" />
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
