import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import { FrostedBackground } from "./components/FrostedBackground";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen font-headline">
      <FrostedBackground />
      <main>{children}</main>
    </div>
  );
}

export default function RoutesApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/anime/:idSlug/*"
        element={
          <Layout>
            <DetailPage />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        }
      />
    </Routes>
  );
}
