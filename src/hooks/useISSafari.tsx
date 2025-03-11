import { useState, useEffect } from "react";

export function useIsSafari() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator?.vendor) {
      setIsSafari(
        navigator.vendor.includes("Apple") &&
          !navigator.userAgent.includes("Chrome"),
      );
    }
  }, []);

  return isSafari;
}
