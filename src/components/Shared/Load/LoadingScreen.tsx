import { Loader2 } from "lucide-react";
import Loader from "./Loader";
import { Loader2Icon } from "lucide-react";

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 bg-darkest-blue border-2 border-solid border-light-blue rounded-small flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      )}
    </>
  );
}
