import { Bounce, ToastContainerProps, ToastPosition } from "react-toastify";

export const toastifyMessage = {
  position: "bottom-center" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const toastContainerConfig: ToastContainerProps = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
  transition: Bounce,
};

// Function to encode a string to Base64
export function encodeBase64(str: string) {
  return Buffer.from(str).toString("base64");
}

// Function to decode a Base64 string
export function decodeBase64(base64Str: string) {
  return Buffer.from(base64Str, "base64").toString("ascii");
}
