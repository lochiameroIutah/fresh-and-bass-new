import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutManager from "./components/LayoutManager.jsx";
import AdminAuth from "./components/AdminAuth.jsx";
import PreviewLayout from "./components/PreviewLayout.jsx";
import Event18Luglio from "./components/Event18Luglio.jsx";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LayoutManager />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/preview" element={<PreviewLayout />} />
        <Route path="/18-luglio" element={<Event18Luglio />} />
      </Routes>
    </Router>
    <Analytics />
  </React.StrictMode>
);
