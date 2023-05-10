import Image from "next/image";
import Button from "../Shared/Buttons/Button";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toaster } from "@/features/services/toaster";
import LoadingButton from "../Shared/Buttons/LoadingButton";

interface IButtonProps extends Partial<User> {
  sentRequest: boolean;
  refetch: () => any;
}

export default function BoardUser({
  id,
  image,
  name,
  profession,
  sentRequest,
  refetch,
}: IButtonProps) {
  const { mutate: sendRequest, isLoading: requestLoading } = useMutation({
    mutationFn: async () => {
      await axios.get("/api/request/" + id);
      toaster.success("Request sucessfuly sent");
      refetch();
    },
    onError() {
      toaster.error("Error sending request. Perhaps you are already friends");
    },
  });

  console.log(sentRequest);

  return (
    <figure
      className="p-[1rem] bg-darkest-blue border-2 border-light-blue border-solid rounded-small flex flex-col w-[30rem] items-center gap-[0.4rem]"
      key={id}
    >
      <Image
        src={image as string}
        alt={`${name}'s avatar`}
        width={150}
        height={150}
        className="rounded-full w-[15rem] aspect-square object-cover"
      />

      <span>{name}</span>
      <span>{profession}</span>
      <LoadingButton
        onClick={() => sendRequest()}
        isLoading={requestLoading}
        disabled={sentRequest}
        text={sentRequest ? "Request sent or friends" : "Send request"}
      />
    </figure>
  );
}
