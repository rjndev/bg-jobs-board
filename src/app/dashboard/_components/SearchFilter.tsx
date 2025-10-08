
type SearchFilterProps = {
  title: string;
}

export default function SearchFilter({ title }: SearchFilterProps) {
  return (
    <div className="border flex flex-col gap-1 border-gray-300 max-w-[300px] rounded-lg px-4 py-2">
        {<p className="font-semibold">{title}</p>}
        <input type="text" placeholder="Search..." className="p-2 outline-none border w-[200px] border-gray-300 rounded-lg" />
    </div>
  );
}