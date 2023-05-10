"use client";

import Button from "@/components/Shared/Buttons/Button";
import Select from "@/components/Shared/Form/Select";
import LoadingScreen from "@/components/Shared/Load/LoadingScreen";
import Tags from "@/components/Tags/Tags";
import professions from "@/features/constants/professions";
import useTags from "@/features/hooks/useTags";
import { TTag } from "@/lib/types/utility";
import { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
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
    <main className="w-screen h-screen flex items-center justify-center pt-[10rem]">
      <div className="center h-[90%] flex items-start justify-start flex-col">
        <div className="min-h-[15rem] relative w-full flex flex-col justify-start gap-[2rem]">
          {/* Input */}

          <div className="w-full flex items-center gap-[2rem]">
            <input
              type="search"
              className="flex-1 bg-white border-2 border-light-blue border-solid rounded-small p-[1rem] text-[1.6rem]"
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

        <div className="text-white text-[2rem] min-h-[30rem]  w-full relative break-words pt-[3rem] flex gap-[2rem] flex-wrap">
          {users?.length ? (
            users.map((user) => (
              <BoardUser {...user} key={user.id} refetch={refetch} />
            ))
          ) : (
            <h2 className="form-title text-start pt-[2rem]">
              {" "}
              Nothing there...
            </h2>
          )}

         
        </div>
      </div>
    </main>
  );
}
