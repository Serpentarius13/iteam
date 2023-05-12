"use client";

import Button from "@/components/Shared/Buttons/Button";
import Select from "@/components/Shared/Form/Select";
import LoadingScreen from "@/components/Shared/Load/LoadingScreen";
import Tags from "@/components/Tags/Tags";
import professions from "@/features/constants/professions";
import useTags from "@/features/hooks/useTags";
import { TTag } from "@/lib/types/utility";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { toaster } from "@/features/services/toaster";
import BoardUser from "@/components/Board/BoardUser";

export default function Board() {
  const { tags: initialTags, handleAddTag, setTags } = useTags([]);

  const params = useSearchParams();
  const router = useRouter();

  const [profession, setProfession] = useState<string>(
    params?.get("profession") ?? professions[0]
  );

  const handleChange = (option: string) => setProfession(option);

  const queryFn = useCallback(async () => {
    let queryString = `?profession=${profession}`;
    // if (initialTags.length)
    //   queryString += `&fields=${JSON.stringify(initialTags)}`;
    router.push(`/board/${queryString}`);
    const { data } = await axios.post("/api/user", {
      fields: initialTags,
      profession,
    });
    return data;
  }, [profession, initialTags]);

  const { data: tags, isLoading } = useQuery<TTag[]>({
    queryFn: async () => {
      const { data } = await axios.get("/api/fields");
      return data;
    },
    queryKey: ["fields"],
    onError() {
      toaster.error("Error loading fields");
    },
  });

  type TUser = User & { sentRequest: boolean };
  const {
    data: users,
    isLoading: loadingUsers,
    refetch,
  } = useQuery<TUser[]>({
    queryKey: ["users"],
    queryFn,
    onError() {
      toaster.error("Error getting users");
    },
  });

  return (
    <main className="flex h-screen w-screen items-center justify-center pt-[10rem]">
      <div className="center flex h-[90%] flex-col items-start justify-start">
        <div className="relative flex min-h-[15rem] w-full flex-col justify-start gap-[2rem]">
          {/* Input */}

          <div className="flex w-full items-center gap-[2rem]">
            <input
              type="search"
              className="flex-1 rounded-small border-2 border-solid border-light-blue bg-white p-[1rem] text-[1.6rem]"
            />

            <Button variant="default" onClick={() => refetch()}>
              {" "}
              Search{" "}
            </Button>
          </div>
          {/* Tags */}

          <Select
            currentOption={profession}
            arrayOfOptions={professions}
            handleChange={handleChange}
            placeholder="Profession"
          />

          <Tags
            allTags={tags ?? []}
            initialTags={initialTags}
            handleAddTag={handleAddTag}
          />

          <LoadingScreen isLoading={isLoading || loadingUsers} />
        </div>

        <div className="relative flex min-h-[30rem]  w-full flex-wrap gap-[2rem] break-words pt-[3rem] text-[2rem] text-white">
          {users?.length ? (
            users.map((user) => (
              <BoardUser {...user} key={user.id} refetch={refetch} />
            ))
          ) : (
            <h2 className="form-title pt-[2rem] text-start">
              {" "}
              Nothing there...
            </h2>
          )}
        </div>
      </div>
    </main>
  );
}
