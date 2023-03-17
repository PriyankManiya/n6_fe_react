import { toast } from "react-toastify";

/* Creating a constant that is an object with the keys of SUCCESS, ERROR, WARNING, and INFO. */
export const ToastType = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

/**
 * It takes a type and a message and displays a toast notification
 * @param type - The type of toast to display.
 * @param msg - The message to display
 */
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
