import React from "react";

interface TabButtonProps {
  label: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  label,
  active,
  onClick,
}) => {
  return (
    <button
        onClick={onClick}
        className={`px-3 py-1 rounded-full font-semibold text-xs transition-all duration-300 
            border-[3px] backdrop-blur-xl
            ${
            active
                ? "bg-tab-active border-tab-border"
                : "bg-tab border-transparent hover:bg-tab-hover"
            }`}
    >
      {label}
    </button>
  );
};
