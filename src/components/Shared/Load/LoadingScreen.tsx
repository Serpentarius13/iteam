import { Loader2 } from "lucide-react";
import Loader from "./Loader";
import { Loader2Icon } from "lucide-react";

export default function LoadingScreen({ isLoading, isGreen = false }: { isLoading: boolean, isGreen?: boolean }) {
  return (
    <>
      {isLoading && (
        <div
          className={`absolute top-0 left-0 bg-darkest-blue  rounded-small flex items-center justify-center w-full h-full ${isGreen && 'borderline'}`}
        >
          <Loader />
        </div>
      )}
    </>
  );
}
