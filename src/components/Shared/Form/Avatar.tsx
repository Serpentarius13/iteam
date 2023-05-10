import { FormEvent, useEffect, useState } from "react";

import Image from "next/image";

interface IAvatarProps {
  initialAvatar?: string | null | undefined;
  handleChange: (file: File) => void;
}

export default function Avatar({ initialAvatar, handleChange }: IAvatarProps) {
  const [avatar, setAvatar] = useState<string>(
    initialAvatar ?? "/img/placeholder-avatar.jpg"
  );

  useEffect(() => {
    if (initialAvatar) setAvatar(initialAvatar);
  }, [initialAvatar]);


  function handleInput(ev: FormEvent<HTMLInputElement>) {
    const { files } = ev.target as HTMLInputElement;

    const file = files![0];

    if (!file) return;

    if (handleChange) handleChange(file);

    const fileReader = new FileReader();

    fileReader.onload = (e) => setAvatar(e!.target!.result!.toString());

    fileReader.readAsDataURL(file);
  }
  return (
    <label className="w-[25rem] aspect-square cursor-pointer avatar relative  ">
      <Image
        src={avatar}
        alt="Your avatar"
        width={250}
        height={250}
        className="rounded-[14rem] w-full h-full"
      />

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onInput={handleInput}
      />
    </label>
  );
}
