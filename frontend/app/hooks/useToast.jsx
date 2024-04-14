import { toast, ToastContent, ToastOptions, Slide, Id } from "react-toastify";

const defaultOptions = {
  position: "top-center",
  closeOnClick: true,
  draggable: true,
  newestOnTop: true,
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: true,
  rtl: false,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  theme: "light",
};

/**
 * Custom hook to display toast notifications.
 *
 * The `show` function accepts the following parameters:
 * @param {string} content - The message content to be displayed in the toast.
 * @param {"success" | "error" | "info" | "warning" | "default"} [type="default"] - The type of toast notification.
 * @param {Object} [options={}] - Optional configuration options for the toast.
 */
export default function useToast() {
  /**
   * The `show` function accepts the following parameters:
   * @param {string} content - The message content to be displayed in the toast.
   * @param {"success" | "error" | "info" | "warning" | "default"} [type="default"] - The type of toast notification.
   * @param {Object} [options={}] - Optional configuration options for the toast.
   */
  function showToast(content = "", type = "default", options = {}) {
    const finalOptions = { ...defaultOptions, ...options };
    switch (type) {
      case "success":
        toast.success(content, finalOptions);
        break;
      case "error":
        toast.error(content, finalOptions);
        break;
      case "info":
        toast.info(content, finalOptions);
        break;
      case "warning":
        toast.warning(content, finalOptions);
        break;
      default:
        toast(content, finalOptions);
    }
  }

  return { show: showToast };
}
