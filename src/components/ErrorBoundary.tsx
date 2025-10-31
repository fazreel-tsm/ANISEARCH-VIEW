import React from "react";
import { Frown } from "lucide-react";
import { Link } from "react-router-dom";
import { FrostedBackground } from "./FrostedBackground";

interface ErrorBoundaryState {
  hasError: boolean;
  isDark: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  observer: MutationObserver | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      isDark: document.documentElement.classList.contains("dark"),
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
      isDark: document.documentElement.classList.contains("dark"),
    };
  }

  componentDidCatch(error: any, info: any) {
    console.error("App Error Boundary caught:", error, info);
  }

  componentDidMount() {
    // Watch for theme changes
    this.observer = new MutationObserver(() => {
      this.setState({
        isDark: document.documentElement.classList.contains("dark"),
      });
    });
    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  componentWillUnmount() {
    this.observer?.disconnect();
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-text font-headline">
        <FrostedBackground />

        <img
          src="/photos/anime_sad_face.png"
          alt="Crying anime face"
          className="w-60 h-auto mb-6 pr-5"
          style={{
            filter: this.state.isDark
              ? "brightness(0) saturate(100%) invert(1)"
              : "brightness(0)",
          }}
        />

        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          Something went wrong
        </h1>
        <p className="text-lg mb-8 text-muted-foreground">
          We’re sorry! An unexpected error occurred. Try refreshing the page or
          go back home.
        </p>

        <Link
          to="/"
          onClick={() => this.setState({ hasError: false })}
          className="px-4 py-2 rounded-full bg-pagination-active text-text font-semibold hover:scale-105 transition"
        >
          Go Home
        </Link>
      </div>
    );
  }
}
