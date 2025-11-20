import { toast } from "react-toastify";

export const handleApiError = (error, defaultMessage = "Something went wrong") => {
  const msg =
    error?.response?.data?.message ||
    error?.response?.data ||
    error?.message ||
    defaultMessage;
  toast.error(msg);
};
