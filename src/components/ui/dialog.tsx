import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />;
}

function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />;
}

function DialogPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />;
}

function DialogClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close {...props} />;
}

function DialogOverlay({
  style,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        ...style,
      }}
      {...props}
    />
  );
}

function DialogContent({
  style,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "600px",
          display: "grid",
          gap: "16px",
          ...style,
        }}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            <XIcon size={16} />
            <span style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
              Close
            </span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        textAlign: "left",
        ...style,
      }}
      {...props}
    />
  );
}

function DialogFooter({
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: "8px",
        ...style,
      }}
      {...props}
    />
  );
}

function DialogTitle({
  style,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      style={{
        fontSize: "1.125rem",
        fontWeight: "600",
        lineHeight: "1.5",
        ...style,
      }}
      {...props}
    />
  );
}

function DialogDescription({
  style,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      style={{
        fontSize: "0.875rem",
        color: "#6b7280", // Tailwind's muted-foreground
        ...style,
      }}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
