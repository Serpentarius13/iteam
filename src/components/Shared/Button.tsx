import { VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva(
  "py-[1.3rem] px-[3.4rem] border-[1px] border-solid rounded-small transition-colors text-[1.2rem] ",
  {
    variants: {
      variant: {
        default:
          "bg-light-blue  border-light-blue text-black hover:bg-dark-blue hover:border-dark-blue hover:text-white",
        outline:
          "bg-transparent border-light-blue text-white hover:bg-light-blue hover:text-black ",
      },
      defaultVariants: {
        variant: "default",
      },
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  className,
  variant,
  children,

  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, className })} {...props}>
      {" "}
      {children}{" "}
    </button>
  );
}