import { CiBoxList } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { Dispatch, SetStateAction } from "react";
import { IoIosList } from "react-icons/io";
import { IoList } from "react-icons/io5";



type ViewOptionsProps = {
  isList : boolean,
  setIsList :  Dispatch<SetStateAction<boolean>>
}

export function ViewOptions({isList, setIsList} : ViewOptionsProps) {
  return (
    <div className="flex gap-4 items-center justify-between border p-2 rounded-lg">
      <div onClick={() => setIsList(true)} className="hover:cursor-pointer w-fit h-fit">
        {isList ? <IoList  size={26} /> : <IoIosList  size={26} />}
      </div>
      <div onClick={() => setIsList(false)} className="hover:cursor-pointer w-fit h-fit">
        {!isList ? <IoGrid size={24} /> : <IoGridOutline size={24} /> }
      </div>
    </div>
  )
}