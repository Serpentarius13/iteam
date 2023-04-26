"use client";

import Button from "@/components/Shared/Buttons/Button";
import LoadingButton from "@/components/Shared/Buttons/LoadingButton";
import { useState } from "react";

export default function Test() {
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      {" "}
      <div className="mt-[10rem]" onClick={() => setLoading(loading => !loading)}>
        <LoadingButton text="Отправить" isLoading={isLoading} />{" "}
      </div>
    </>
  );
}
