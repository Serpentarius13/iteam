"use client";

import Select from "@/components/Shared/Form/Select";
import { useState } from "react";

export default function Test() {
  const [current, setCurrent] = useState<string | null>(null);

  const arrayOfOptions = [
    "Front-end",
    "Backend",
    "Design",
    "DevOPS",
    "QA Assurance",
  ];

  function handleChange(option: string) {
    setCurrent(option);
  }
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <form className="max-w-[90vw] w-[35rem]">
        <Select
          currentOption={current}
          arrayOfOptions={arrayOfOptions}
          handleChange={handleChange}
          placeholder="Profession"
        />
      </form>
    </main>
  );
}
