import { toast } from "sonner";
import type { ReactNode } from "react";

export function ToastProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useToast() {
  return {
    showToast: (message: string, type: "success" | "error" | "info" = "info") => {
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      } else {
        toast.info(message);
      }
    }
  };
}
