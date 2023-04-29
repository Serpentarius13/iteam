"use client";

import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    fetch("/api/send-email");
  }, []);
  return <></>;
}
