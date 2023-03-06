import { toast } from "react-toastify";

export const ToastType = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export function notify(type, msg) {
  switch (type) {
    case ToastType.SUCCESS:
      toast.success(msg);
      break;
    case ToastType.ERROR:
      toast.error(msg);
      break;
    case ToastType.WARNING:
      toast.warning(msg);
      break;
    case ToastType.INFO:
      toast.info(msg);
      break;
    default:
      toast(msg);
      break;
  }
}
