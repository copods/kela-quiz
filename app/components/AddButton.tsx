
export default function AddButton({ label }: { label: string }) {
  return (
    <div className="">
       <button className="rounded-lg bg-[#353988] px-4  py-2  text-sm font-medium leading-4 text-[#F0FDF4]">
           {label}
          </button>
    </div>
  );
}
