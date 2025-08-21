import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SkusPage from "./skus/page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SkusPage />
  </StrictMode>,
);
