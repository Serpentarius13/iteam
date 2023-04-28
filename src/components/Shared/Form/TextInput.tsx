

import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { RegisterOptions } from "react-hook-form";

import { CSSTransition, Transition } from "react-transition-group";

type TInputType = "text" | "password";

interface ITextInputProps {
  register: any;
  placeholder: string;
  error: string | undefined;
  isTextArea?: boolean;
  type?: TInputType;
  onChange?: () => any;
}

export default function TextInput({
  register,
  error,
  placeholder,
  isTextArea = false,
  type,
  onChange,
}: ITextInputProps) {
  const [inputType, setType] = useState<TInputType>(type ?? "text");

  const inputClassName = useMemo(() => {
    let className =
      " bg-white rounded-small py-[1.2rem] pl-[3rem] border-none outline-none focus:ring-2 focus:ring-light-blue text-[1.7rem] w-full placeholder:text-darkest-blue leading-[2.7rem] -tracking-[0.5px]";

    if (error) {
      className += "border-[1px] border-red-600 border-solid ";
    }
    return className;
  }, [error]);

  function handleChangeType() {
    setType((type) => {
      if (type == "password") return "text";
      else return "password";
    });
  }

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles: any = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const nodeRef = useRef(null);
  return (
    <label className="flex flex-col gap-[1rem] relative">
      <div className="relative w-full">
        {isTextArea ? (
          <textarea
            {...register}
            className={inputClassName}
            placeholder={placeholder}
            onChange={onChange}
          />
        ) : (
          <input
            {...register}
            type={inputType}
            className={inputClassName}
            placeholder={placeholder}
            onChange={onChange}
          />
        )}

        {type == "password" ? (
          <button
            className="absolute top-1/2 -translate-y-1/2 right-[1rem]"
            onClick={handleChangeType}
            type="button"
          >
            {inputType == "password" ? <EyeIcon /> : <EyeOffIcon />}{" "}
          </button>
        ) : (
          <></>
        )}
      </div>
      <Transition nodeRef={nodeRef} in={!!error} timeout={duration}>
        {(state) => (
          <div
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <p ref={nodeRef} className="text-[1.6rem] text-red-600 font-bold">
              {error}
            </p>
          </div>
        )}
      </Transition>
    </label>
  );
}
