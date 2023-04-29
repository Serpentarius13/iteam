import { TTag } from "@/lib/types/utility";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useTags(initialTags: TTag[]) {
  const [tags, setTags] = useState<TTag[]>(initialTags);

  function handleAddTag(tag: TTag) {
    setTags((tags) => {
      if (tags.includes(tag)) {
        return tags.filter((el) => el.fieldName != tag.fieldName);
      } else {
        return [...tags, tag];
      }
    });
  }


  return { tags, handleAddTag, setTags };
}
