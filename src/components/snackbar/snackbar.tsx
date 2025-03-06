import { useEffect } from "react";
import "./Snackbar.css";

const Snackbar = ({ message, type = "info", open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <div className={`snackbar ${open ? "show" : ""} ${type}`}>{message}</div>
  );
};

export default Snackbar;
