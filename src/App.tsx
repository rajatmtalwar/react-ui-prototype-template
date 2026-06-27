import { Routes, Route } from "react-router";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}
