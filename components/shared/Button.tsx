import { ButtonHTMLAttributes, MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      className="border-2 text-center rounded-full px-5 py-2 border-slate-900 w-fit h-fit m-3 hover:opacity-60 hover:border-emerald-800 hover:text-emerald-600"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
