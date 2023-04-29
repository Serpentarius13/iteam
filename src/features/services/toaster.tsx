import { toast } from "react-hot-toast";

class Toaster {
  success(message: string, timeout: number = 2000) {
    toast(message, {
      icon: "✅",
      style: {
        borderRadius: "12px",
        background: "#041D2D",
        color: "#22c55e",
        padding: "1rem",
        border: "2px solid #22c55e",
        fontSize: "1.4rem",
      },
      duration: timeout,
    });
  }

  error(message: string, timeout: number = 2000) {
    toast(message, {
      icon: "❌",
      style: {
        borderRadius: "12px",
        background: "#041D2D",
        color: "#ef4444",
        padding: "1rem",
        border: "2px solid #ef4444",
        fontSize: "1.4rem",
      },
      duration: timeout,
    });
  }

  warning(message: string, timeout: number = 2000) {
    toast(message, {
      icon: "⚠️",
      style: {
        borderRadius: "12px",
        background: "#041D2D",
        color: "#f59e0b",
        padding: "1rem",
        border: "2px solid #f59e0b",
        fontSize: "1.4rem",
      },
      duration: timeout,
    });
  }
}

export const toaster = new Toaster();
