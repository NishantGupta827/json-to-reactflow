import { ReactNode } from "react";

export type NodeStatusIndicatorProps = {
  status?: "loading" | "success" | "error" | "initial";
  children: ReactNode;
};

export const LoadingIndicator = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "-1px",
          top: "-1px",
          height: "calc(100% + 2px)",
          width: "calc(100% + 2px)",
        }}
      >
        <style>
          {`
          @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          .spinner {
            animation: spin 2s linear infinite;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 140%;
            aspect-ratio: 1;
            transform-origin: center;
            background: conic-gradient(from 0deg at 50% 50%, rgb(42,67,233) 0deg, rgba(42,138,246,0) 360deg);
            border-radius: 9999px;
          }
        `}
        </style>
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: "16px",
          }}
        >
          <div className="spinner" />
        </div>
      </div>
      {children}
    </>
  );
};

const StatusBorder = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  let borderColor = "#000";
  if (className?.includes("border-emerald-600")) {
    borderColor = "rgb(5, 150, 105)";
  } else if (className?.includes("border-red-400")) {
    borderColor = "rgb(248, 113, 113)";
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "-1px",
          top: "-1px",
          height: "calc(100% + 2px)",
          width: "calc(100% + 2px)",
          borderRadius: "16px",
          border: "2px solid",
          borderColor: borderColor,
        }}
      />
      {children}
    </>
  );
};

export const NodeStatusIndicator = ({
  status,
  children,
}: NodeStatusIndicatorProps) => {
  switch (status) {
    case "loading":
      return <LoadingIndicator>{children}</LoadingIndicator>;
    case "success":
      return (
        <StatusBorder className="border-emerald-600">{children}</StatusBorder>
      );
    case "error":
      return <StatusBorder className="border-red-400">{children}</StatusBorder>;
    default:
      return <>{children}</>;
  }
};
