import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forum/:name" element={<div>Bem vindo ao forum</div>} />
    </Routes>
  )
}