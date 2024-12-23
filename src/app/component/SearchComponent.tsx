'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";

interface ISearchBoxProps {}

const SearchBox: React.FC<ISearchBoxProps> = (props) => {
  const route = useRouter();
  const [input, setInput] = useState("");

  const handleSearch = () => {
    route.replace(`/search?q=${encodeURIComponent(input.toLowerCase().trim())}`);
  };

  return (
    <div className="search-box mb-4 flex mt-3">
      <input
        type="text"
        placeholder="Search articles..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <Button
        onClick={handleSearch}
        className="ml-2 bg-blue-500 text-white rounded"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBox;