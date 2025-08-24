


 import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import FileFilter from "./FileFilter";
import FileCardMenu from "./FileCardMenu";
import gridIcon from "../assets/grid.png";
import tableIcon from "../assets/table.png";
import uploadPlaceholder from "../assets/uploadpla.png";



  export default function FileArea() {
  const backendUrl = "http://localhost:5000"; // backend URL
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

   const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/files`);
      setFiles(response.data);
    } catch (err) {
      setFiles([]);
      console.error("Error fetching files:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (file) => {
    if (!file) return;
    setSelectedFile(file);
    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please choose a file first.");
    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.publicUrl) {
        setFiles((prev) => [
          ...prev,
          {
            id: response.data.id,
            name: selectedFile.name,
            publicUrl: response.data.publicUrl,
          },
        ]);
        setSelectedFile(null);
        setPreviewUrl(null);
        if (inputRef.current) inputRef.current.value = "";
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("File upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleTrash = async (file) => {
    try {
      await axios.delete(`${backendUrl}/files/${file.id}`);
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    } catch (err) {
      console.error("Error deleting file:", err);
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const filteredFiles = files.filter((file) => {
    if (filter !== "All") {
      if (filter === "Images" && !/\.(png|jpg|jpeg|gif)$/i.test(file.name)) return false;
      if (filter === "Documents" && !/\.(pdf|docx?|xlsx?|pptx?)$/i.test(file.name)) return false;
      if (filter === "Videos" && !/\.(mp4|mov|webm)$/i.test(file.name)) return false;
    }
    if (search && !file.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <section className="flex-1 flex flex-col p-6 relative">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="mt-3 text-white font-medium">Loading...</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Files</h1>

        <FileFilter search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
        <button
          type="button"
          className="bg-gray-900 text-white px-5 py-2 rounded"
          onClick={() => inputRef.current?.click()}
        >
          Upload File
        </button>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mb-6 border-2 border-dashed rounded-lg p-6 text-center transition ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <p className="text-gray-600">
          Drag & Drop files here or{" "}
          <span className="text-blue-600 cursor-pointer font-medium" onClick={() => inputRef.current?.click()}>
            browse
          </span>
        </p>
      </div>

      {selectedFile && (
        <div className="mb-4 p-4 border border-gray-200 bg-white rounded flex items-center gap-4">
          <div>
            <p className="font-semibold">{selectedFile.name}</p>
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="h-32 mt-2 object-contain" />
            ) : (
              <p className="text-gray-500 mt-2">No preview available</p>
            )}
          </div>
          <button type="button" onClick={handleUpload} className="ml-auto bg-green-600 text-white px-4 py-2 rounded">
            Upload
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div className="flex border border-gray-300 rounded overflow-hidden">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`px-4 py-2 ${view === "grid" ? "bg-gray-200" : ""}`}
          >
            <img src={gridIcon} alt="Grid" className="h-5 w-5 inline-block mr-1" />
            Grid
          </button>
          <button
            type="button"
            onClick={() => setView("table")}
            className={`px-4 py-2 ${view === "table" ? "bg-gray-200" : ""}`}
          >
            <img src={tableIcon} alt="Table" className="h-5 w-5 inline-block mr-1" />
            Table
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label>Type Filter</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option>All</option>
            <option>Documents</option>
            <option>Images</option>
            <option>Videos</option>
          </select>
        </div>
      </div>

      {filteredFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow text-gray-500">
          <img src={uploadPlaceholder} alt="Empty Folder" className="max-w-xs mb-6" />
          <p className="text-lg font-medium">You have no files, upload one now</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <FileCardMenu key={file.id} file={file} onTrash={() => handleTrash(file)} />
          ))}
        </div>
      ) : (
        <table className="w-full bg-white rounded border border-gray-300">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 border-b">File Name</th>
              <th className="text-left py-2 px-4 border-b">Preview</th>
              <th className="text-left py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file) => (
              <tr key={file.id} className="border-b">
                <td className="py-2 px-4 break-words">{file.name}</td>
                <td className="py-2 px-4">
                  {/\.(png|jpg|jpeg|gif)$/i.test(file.name) ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={file.publicUrl}
                        alt={file.name}
                        className="h-12 w-12 object-contain border rounded"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                      <a
                        href={file.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Open
                      </a>
                    </div>
                  ) : (
                    <a
                      href={file.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Open
                    </a>
                  )}
                </td>
                <td className="py-2 px-4">
                  <FileCardMenu file={file} onTrash={() => handleTrash(file)} mode="default" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}