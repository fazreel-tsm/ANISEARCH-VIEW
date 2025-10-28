import { Frown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const [isDark, setIsDark] = useState<boolean>(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-text font-headline">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="w-full h-full bg-bg/30 backdrop-blur-2xl rounded-xl shadow-inner" />
      </div>

      <img
        src="/anime_sad_face.png"
        className="w-60 h-auto text-text mb-6 pr-5"
        style={{
          filter: isDark
            ? "brightness(0) saturate(100%) invert(1)"
            : "brightness(0)",
        }}
        alt="Crying anime face"
      />

      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded-full bg-pagination-active text-text font-semibold hover:scale-105 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
