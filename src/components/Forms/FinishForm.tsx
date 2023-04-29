"use client";

import Select from "@/components/Shared/Form/Select";
import { toaster } from "@/features/services/toaster";
import { FormEvent, useEffect, useState } from "react";

import LoadingScreen from "../Shared/Load/LoadingScreen";
import Tags from "../Tags/Tags";
import { useSession } from "next-auth/react";
import { TTag } from "@/lib/types/utility";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Button, { buttonVariants } from "../Shared/Buttons/Button";
import { User } from "next-auth";
import EmailLinks from "./EmailLinks";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FinishForm() {
  const [profession, setProfession] = useState<string | null>(null);
  const { data: tags, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axios.get("/api/fields");
      return data;
    },
    onError() {
      toaster.error("Error loading tags. Please reload the page");
    },
  });

  const [initialTags, setInitialTags] = useState<TTag[]>([]);

  const {
    mutate,
    isSuccess,
    isLoading: isLoadingFinish,
  } = useMutation({
    mutationKey: ["finish"],
    mutationFn: async () => {
      return await axios.post("/api/update-user", {
        profession: profession,
        fields: initialTags,
      });
    },
    async onSuccess() {
      toaster.success("Successfully finished registration");

      console.log("success");
      try {
        await fetch("/api/send-email");
        console.log("sent");
        toaster.success('Sent your email')
      } catch (error) {
        toaster.error("There was an error sending your email");
      }
    },
    onError() {
      toaster.error(
        "There was an error finishing registration. Please check in later."
      );
    },
  });

  const arrayOfOptions = [
    "Front-end",
    "Backend",
    "Design",
    "DevOPS",
    "QA Assurance",
  ];

  function handleChange(option: string) {
    setProfession(option);
  }

  function handleAddTag(tag: TTag) {
    setInitialTags((tags) => {
      if (tags.includes(tag)) {
        return tags.filter((el) => el.fieldName != tag.fieldName);
      } else {
        return [...tags, tag];
      }
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!profession) return toaster.warning("Select your profession");

    if (initialTags.length === 0)
      return toaster.warning("Please select at least one tech");

    mutate();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[90vw] w-[35rem] flex flex-col gap-[2rem] justify-center items-center relative min-h-[40rem]"
    >
      {isSuccess ? (
        <div className="flex flex-col gap-[1rem] items-center justify-center">
          <p className="text-[1.6rem] text-white text-center">
            Verify your account by clicking a link in your email to use all the
            cool features!
          </p>
          <EmailLinks />

          <Link
            href="/profile"
            className={buttonVariants({ variant: "outline" })}
          >
            {" "}
            Go to profile{" "}
          </Link>
        </div>
      ) : (
        <>
          <Select
            currentOption={profession}
            arrayOfOptions={arrayOfOptions}
            handleChange={handleChange}
            placeholder="Profession"
          />
          <h3 className="form-title">What tech are you into?</h3>
          {isLoading ? (
            <LoadingScreen isLoading={isLoading} />
          ) : (
            tags && (
              <Tags
                allTags={tags}
                handleAddTag={handleAddTag}
                initialTags={initialTags}
              />
            )
          )}
          <Button
            variant="default"
            className="font-bold text-white text-[1.8rem] uppercase"
          >
            {" "}
            Finish registration{" "}
          </Button>{" "}
        </>
      )}

      <LoadingScreen isLoading={isLoadingFinish} />
    </form>
  );
}