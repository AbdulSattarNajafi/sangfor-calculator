"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useWindowWidth from "@/hooks/useWindowWidth";

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const width = useWindowWidth();
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage(height, "https://live-sangfor.pantheonsite.io");
    };

    window.scrollTo({ top: 0, behavior: "smooth" });
    sendHeight();
    window.addEventListener("resize", sendHeight);
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", sendHeight);
      observer.disconnect();
    };
  }, [currentPath, width]);

  return <main>{children}</main>;
}
