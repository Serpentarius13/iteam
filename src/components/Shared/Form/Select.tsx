import React, { KeyboardEventHandler, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { Transition } from "react-transition-group";

interface ISelectProps {
  currentOption: string | null | undefined;
  arrayOfOptions: string[];
  handleChange: (option: string) => void;
  placeholder: string;
}

const duration = 200;

const defaultStyle = {
  transition: `all ${duration}ms ease`,
  opacity: 0,
};

const transitionStyles: any = {
  entering: { opacity: 1, display: "none" },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0, display: "none" },
};

export default function Select({
  currentOption,
  arrayOfOptions,
  handleChange,
  placeholder,
}: ISelectProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const nodeRef = useRef(null);

  function openSelect() {
    setIsOpened((state) => !state);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    e.preventDefault();
    console.log(e.key);
    if (e.key == "ArrowDown") {
      const foundIx = arrayOfOptions.findIndex((el) => el == currentOption);

      if (foundIx || foundIx == 0) {
        const nextIndex = foundIx + 1;
        console.log(nextIndex);
        if (nextIndex == arrayOfOptions.length) {
          handleChange(arrayOfOptions[0]);
          console.log("is");
        } else {
          console.log("isnt");
          handleChange(arrayOfOptions[nextIndex]);
        }
      }
    }

    if (e.key == "ArrowUp") {
      const foundIx = arrayOfOptions.findIndex((el) => el == currentOption);

      if (foundIx || foundIx == 0) {
        const prevIndex = foundIx - 1;

        if (prevIndex < 0) {
          handleChange(arrayOfOptions[arrayOfOptions.length - 1]);
        } else {
          handleChange(arrayOfOptions[prevIndex]);
        }
      }
    }
  }
  return (
    <ClickAwayListener onClickAway={() => setIsOpened(false)}>
      <div
        className="w-full flex flex-col rounded-small bg-white relative  select-none"
        aria-haspopup="listbox"
        aria-expanded={isOpened}
        aria-labelledby="select-label"
        onKeyDown={handleKeyDown}
      >
        <button
          className="flex "
          onClick={openSelect}
          type="button"
          aria-controls="select-list"
        >
          <span className="input-field w-full text-start" id="select-label">
            {currentOption ? currentOption : placeholder}
          </span>
          <div className="flex items-center justify-center bg-light-blue py-[2rem] px-[1.5rem] rounded-small w-[5rem]">
            <svg
              width="25"
              height="15"
              viewBox="0 0 25 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${isOpened && "rotate-180"} transition-all`}
            >
              <path
                d="M2 2L12.5 12.5L23 2"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </button>

        <Transition nodeRef={nodeRef} in={isOpened} timeout={duration}>
          {(state) => (
            <ul
              className="flex flex-col absolute top-0 translate-y-[5rem] w-full items-stretch  border-2 border-solid border-light-blue"
              ref={nodeRef}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
              role="listbox"
              id="select-list"
              tabIndex={0}
            >
              {arrayOfOptions.map((option) => (
                <li
                  key={option}
                  className="input-field w-full bg-white cursor-pointer"
                  role="option"
                  aria-selected={currentOption === option}
                >
                  <button
                    className="w-full text-start"
                    type="button"
                    onClick={() => {
                      handleChange(option);
                      setIsOpened(false);
                    }}
                  >
                    {" "}
                    {option}
                  </button>{" "}
                </li>
              ))}
            </ul>
          )}
        </Transition>
      </div>
    </ClickAwayListener>
  );
}
