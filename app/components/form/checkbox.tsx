function Checkbox() {
  return (
    <div className="flex items-center">
      <input
        id="remember"
        name="remember"
        type="checkbox"
        className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor="remember" className="ml-2 block text-xs text-gray-800">
        Remember me
      </label>
    </div>
  );
}

export default Checkbox;
