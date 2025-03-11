import { useEffect, useState } from "react";
import SnakbarHandler from "./index.Snackbar";

interface SnackbarProps {
  result: {
    meta: {
      requestStatus: string;
    };
  };
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Snackbar({ result, open, setOpen }: SnackbarProps) {
    const [message, setMessage] = useState<String>()
  useEffect(() => {
    if (result?.meta?.requestStatus === "fulfilled") {
      setOpen(true);
      setMessage("Books fetched successfully!");
    }
    if (result?.meta?.requestStatus === "rejected") {
      setOpen(true);
      setMessage("Failed to fetch books!");
    }
  }, [result, setOpen]);

  return (
    open && <SnakbarHandler open={open} setOpen={setOpen} message={message} />
  );
}
