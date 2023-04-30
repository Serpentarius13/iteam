"use client";

import { ErrorIcon } from "react-hot-toast";
import Button from "../components/Shared/Buttons/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="w-screen h-screen max-w-screen overflow-x-hidden flex flex-col gap-[2rem] items-center justify-center">
      <ErrorIcon />

      <p className="text-[2rem] font-bold text-red-500">
        Sorry, there was an error <br /> {error.message} <br /> {error.stack}
      </p>

      <Button variant="default" onClick={() => reset()}>
        {" "}
        Go back{" "}
      </Button>
    </div>
  );
}
