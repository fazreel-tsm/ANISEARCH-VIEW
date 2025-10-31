import React from "react";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-text font-headline">
      {/* Biking Character */}
      <div className="relative w-full max-w-md h-8 mb-8">
        <img
          src="/photos/cycling1.png"
          alt="Onoda biking"
          className="absolute left-0 top-[-50px] w-14 animate-bike select-none"
        />
        {/* Progress Bar Background */}
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          {/* Animated Bar */}
          <div className="h-full bg-header animate-progress" />
        </div>
      </div>

      {/* Tailwind keyframes (using inline style since it’s local) */}
      <style>
        {`
          @keyframes progressMove {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes bikeMove {
            0% { left: 0%; transform: rotate(0deg); opacity: 0; }
            5% { opacity: 1;}
            40% { left: 40%; transform: rotate(-10deg); }
            95% { opacity: 1;}
            100% { left: 90%; transform: rotate(0deg); opacity: 0; }
          }
          .animate-progress {
            animation: progressMove 1s linear infinite;
          }
          .animate-bike {
            animation: bikeMove 2s linear infinite;
          }
        `}
      </style>
    </div>
  );
};
