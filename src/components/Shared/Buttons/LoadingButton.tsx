import Loader from "../Loader";
import Button from "./Button";

interface ILoadingButtonProps {
  isLoading: boolean;
  text: string;
}

export default function LoadingButton({
  isLoading,
  text,
}: ILoadingButtonProps) {
  return (
    <Button
      disabled={isLoading}
      variant="default"
      className="flex items-center  justify-center gap-[1rem]"
    >
      {isLoading && (
        <div className="w-[3rem] h-[3rem] flex items-center">
          {" "}
          <Loader />{" "}
        </div>
      )}
      {text}
    </Button>
  );
}
