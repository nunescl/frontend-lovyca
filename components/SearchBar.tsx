import React from 'react';

export default function SearchBar({
  placeholder,
  search,
  onChange,
}: {
  placeholder?: string;
  search?: string;
  onChange?: any;
}) {
  return (
    <div className="flex justify-bettween">
      <form action="" className="w-full">
        <div className="relative flex items-center justify-end text-gray-400 focus-within:text9 text-sm">
          <input
            className="h-9 w-full p-2 duration-300 outline-none border border-1 border-solid border-gray-400 rounded focus:border-b-teal-500 text-slate-900 spin-button-none"
            placeholder={placeholder}
            type="search"
            value={search}
            onChange={onChange}
          ></input>
          <i className="fa-solid fa-magnifying-glass absolute ml-3 pr-5 pointer-events-none"></i>
        </div>
      </form>
    </div>
  );
}
