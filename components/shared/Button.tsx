import { ButtonHTMLAttributes, MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      className="border-2 text-center rounded-full min-w-[80px] px-2 border-slate-900 w-fit h-fit m-3"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
