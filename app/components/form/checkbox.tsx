interface type {
  setIsRemember: React.Dispatch<React.SetStateAction<boolean>>;
}

function Checkbox({ setIsRemember }: type) {
  function handleChangle(e: React.ChangeEvent<HTMLInputElement>) {
    setIsRemember((e.target as HTMLInputElement).checked);
  }

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500"
        onChange={(e) => handleChangle(e)}
      />
    </div>
  );
}

export default Checkbox;
