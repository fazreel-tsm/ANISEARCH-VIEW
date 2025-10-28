import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 
        hover:scale-110 active:scale-95 bg-header text-gray-200
        ${visible ? "opacity-85 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
