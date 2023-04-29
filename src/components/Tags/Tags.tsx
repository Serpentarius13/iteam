import { Fields } from "@prisma/client";

import { TTag } from "@/lib/types/utility";

interface ITagsProps {
  initialTags: TTag[] | undefined;
  allTags: TTag[];
  handleAddTag: (tag: TTag) => void;
}

export default function Tags({
  initialTags,
  allTags,
  handleAddTag,
}: ITagsProps) {
  function checkInTags(tag: TTag) {
    return initialTags!.includes(tag);
  }
  return (
    <ul className="flex flex-wrap gap-[1rem]">
      {allTags.map((tag) => {
        const isChecked = checkInTags(tag) as unknown as boolean;
        return (
          <li key={tag.id}>
            <label>
              {" "}
              <input
                type="checkbox"
                onInput={() => handleAddTag(tag)}
                className="hidden peer"
              />
              <div
                className={`bg-transparent border-2 border-solid border-light-blue text-white text-[1.4rem] font-bold transition-all    p-[1rem] cursor-pointer select-none peer-checked:bg-light-blue peer-checked:rounded-[3rem]`}
              >
                {tag.fieldName}
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
