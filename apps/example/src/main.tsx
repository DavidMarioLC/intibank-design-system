import {
  Avatar,
  Badge,
  Button,
  DynamicToken,
  MoneyField,
  OtpInput,
  TextField,
} from "@intibank/ui";
import { ArrowRightIcon } from "@intibank/ui/icons";
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "@intibank/ui/styles.css";
import "./theme.css";

const handleTokenResend = () => undefined;

function OtpExample() {
  const [code, setCode] = useState("");

  return (
    <OtpInput
      helperText="Ingresa el código que enviamos a tu celular."
      label="Código de verificación"
      name="otp"
      onValueChange={setCode}
      required
      value={code}
    />
  );
}

function App() {
  return (
    <main className="example-shell">
      <p>Esta aplicación no instala ni configura Tailwind.</p>
      <Avatar aria-label="María Elena" initials="ME" />
      <Badge variant="success">Activo</Badge>
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
      <OtpExample />
      <DynamicToken
        code="739418"
        description="Ingresa el código seguro generado automáticamente en tu App Intibank Móvil."
        expiryLabel="Expira en:"
        heading="Token Digital Dinámico"
        onResend={handleTokenResend}
        remainingSeconds={8}
        resendLabel="Reenviar código"
        status="active"
        statusLabel="Activo"
      />
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
