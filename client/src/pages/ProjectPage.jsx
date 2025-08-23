import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FileArea from "../components/FileArea";
import FileCardMenu from "../components/FileCardMenu"; // Fixed import
import FileFilter from "../components/FileFilter";

export default function ProjectPage() {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* File Tools */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          {/* You can remove FileFilter here if FileArea has its own FileFilter */}
          <FileFilter />
          <FileCardMenu />
        </div>

        {/* File Area */}
        <div className="flex-1 overflow-y-auto">
          <FileArea />
        </div>
      </div>

      {/* No Trash Sidebar as per your requirement */}
    </div>
  );
}
