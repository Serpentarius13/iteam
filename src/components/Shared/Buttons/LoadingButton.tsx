import Loader from "../Load/Loader";
import Button from "./Button";

interface ILoadingButtonProps {
  isLoading: boolean;
  text: string;
  onClick: () => any;
}

export default function LoadingButton({
  isLoading,
  text,
  onClick
}: ILoadingButtonProps) {
  return (
    <Button
      disabled={isLoading}
      variant="default"
      className="flex items-center  justify-center gap-[1rem]"
      onClick={onClick}
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
