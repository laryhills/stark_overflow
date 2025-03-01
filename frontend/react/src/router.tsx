import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Forum } from "./pages/Forum";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forum/:name" element={<Forum />} />
    </Routes>
  )
}