import { useEffect } from "react";

import Snackbar from "@mui/material/Snackbar";

import useStore from "../store";

function OnlineTracker() {
  const open = useStore((s) => s.networkTracker.open);
  const message = useStore((s) => s.networkTracker.message);
  const setNetworkTracker = useStore((s) => s.setNetworkTracker);

  useEffect(() => {
    window.addEventListener("online", () => {
      setNetworkTracker({ open: true, message: "You are online!!" });
    });
    window.addEventListener("offline", () => {
      setNetworkTracker({
        open: true,
        message: "Lost Network Connection!!",
      });
    });
  }, [setNetworkTracker]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() =>
        typeof setNetworkTracker === "function" &&
        setNetworkTracker({ open: false })
      }
      message={`${message}`}
    />
  );
}

export default OnlineTracker;
