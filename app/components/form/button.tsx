interface types {
  type: "submit" | "reset" | "button";
  buttonText: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ type, buttonText, handleClick }: types) {
  return (
    <button
      type={type}
      className="w-full rounded bg-primary py-2.5 text-gray-50"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}

export default Button;
