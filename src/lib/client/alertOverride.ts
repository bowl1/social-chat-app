import { toast } from "sonner";

export const installCustomAlert = () => {
  if (typeof window === "undefined") return;
  if ((window as any).__customAlertInstalled) return;

  window.alert = (msg: any) => {
    toast(String(msg));
  };

  (window as any).__customAlertInstalled = true;
};
