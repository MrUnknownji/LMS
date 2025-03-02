import { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/course-list/${input}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search for courses..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full py-3 pl-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
      >
        <img src={assets.search_icon} alt="Search" className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;
