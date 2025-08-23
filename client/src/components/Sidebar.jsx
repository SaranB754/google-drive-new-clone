import { useState } from "react";
import files from "../assets/files.png";
import trash from "../assets/trash.png";
import favs from "../assets/star.png";
import dots from "../assets/dots.png"; // add a 3-dots image in assets (you can download one)

export default function Sidebar({ setActiveView }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={`flex flex-col gap-4 bg-gray-100 p-4 transition-all duration-300 ${
        collapsed ? "w-16" : "w-48"
      }`}
    >
      {/* Collapse/Expand button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 self-end hover:bg-gray-200 p-2 rounded"
      >
        <img src={dots} alt="Toggle" className="h-5 w-5" />
      </button>

      {/* All Files */}
      <button
        className="flex items-center gap-2 text-left hover:bg-gray-200 p-2 rounded"
        onClick={() => setActiveView("files")}
      >
        <img src={files} alt="All Files" className="h-5 w-5" />
        {!collapsed && "All Files"}
      </button>

      {/* Favorites */}
      <button className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
        <img src={favs} alt="Favorites" className="h-5 w-5" />
        {!collapsed && "Favorites"}
      </button>

      {/* Trash */}
      <button
        className="flex items-center gap-2 text-blue-600 font-bold hover:bg-gray-200 p-2 rounded"
        onClick={() => setActiveView("trash")}
      >
        <img src={trash} alt="Trash" className="h-5 w-5" />
        {!collapsed && "Trash"}
      </button>
    </nav>
  );
}
