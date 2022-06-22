function Button(props: any) {
  return (
    <button
      type={props.type}
      className="w-full rounded bg-primary py-2.5 text-[#F0FDF4]"
    >
      {props.buttonText}
    </button>
  );
}

export default Button;
