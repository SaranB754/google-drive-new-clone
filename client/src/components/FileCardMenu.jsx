// import React, { useState } from "react";
// import dots from "../assets/dots.png";
// import fileIcon from "../assets/files.png";
// import avatarImg from "../assets/avatar.jpeg";

// export default function FileCard({ file, onTrash, onFavorite, onDownload }) {
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Defensive check for file prop
//   if (!file) {
//     return null; // or some fallback UI
//   }

//   const isImage = /\.(png|jpg|jpeg|gif)$/i.test(file?.name || "");
//   const previewSrc = isImage ? file.publicUrl || fileIcon : fileIcon;

//   return (
//     <div className="relative bg-white rounded-2xl shadow border transition hover:shadow-lg p-0 flex flex-col min-h-[290px]">
//       {/* Menu button */}
//       <button
//         className="absolute top-3 right-3 z-10 p-1 bg-white/80 rounded-full hover:bg-gray-100 transition"
//         onClick={() => setMenuOpen(!menuOpen)}
//         aria-label="Open file menu"
//       >
//         <img src={dots} alt="More" className="w-5 h-5" />
//       </button>

//       {menuOpen && (
//         <div className="absolute top-9 right-3 bg-white shadow-xl rounded-xl w-44 z-30 border">
//           <button
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
//             onClick={() => {
//               onTrash?.(file);
//               setMenuOpen(false);
//             }}
//           >
//             Move to Trash
//           </button>
//           <button
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
//             onClick={() => {
//               onFavorite?.(file);
//               setMenuOpen(false);
//             }}
//           >
//             Add to Favorites
//           </button>
//           <button
//             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//             onClick={() => {
//               onDownload?.(file);
//               setMenuOpen(false);
//             }}
//           >
//             Download
//           </button>
//         </div>
//       )}

//       {/* Card content */}
//       <div className="flex flex-col items-center px-6 py-5 pt-6">
//         <div
//           className="mb-2 w-full flex items-center gap-2 text-gray-600 text-base font-medium truncate"
//           title={file?.name}
//         >
//           {isImage ? (
//             <span className="text-xl">🖼️</span>
//           ) : (
//             <span className="text-xl">📄</span>
//           )}
//           <span>{file?.name || "Unnamed File"}</span>
//         </div>

//         {/* Preview */}
//         <div className="w-full flex-1 flex items-center justify-center min-h-[105px] bg-gray-50 rounded-lg mb-3">
//           {isImage ? (
//             <img
//               src={previewSrc}
//               alt={file.name}
//               className="h-24 rounded-lg object-contain mx-auto"
//               onError={(e) => (e.currentTarget.src = fileIcon)}
//             />
//           ) : (
//             <img
//               src={fileIcon}
//               alt="file"
//               className="h-14 w-14 opacity-70 mx-auto"
//             />
//           )}
//         </div>
//       </div>

//       {/* Footer (avatar + timestamp) */}
//       <div className="flex items-center gap-2 px-5 pb-4 pt-0">
//         <img
//           src={avatarImg}
//           alt="Uploader"
//           className="w-6 h-6 rounded-full border"
//           onError={(e) => (e.currentTarget.style.display = "none")}
//         />
//         <span className="text-xs text-gray-800 line-clamp-1">
//           {file.uploader || "Cody Seibert"}
//         </span>
//         <span className="text-xs text-gray-500 ml-auto">Uploaded just now</span>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import dots from "../assets/dots.png";
import fileIcon from "../assets/files.png";
import avatarImg from "../assets/avatar.jpeg";
export default function FileCard({ file, onTrash }) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!file) return null;

  const isImage = /\.(png|jpg|jpeg|gif)$/i.test(file?.name || "");
  const previewSrc = isImage ? file.publicUrl || fileIcon : fileIcon;

  // handle double click
  const handleOpen = () => {
    if (!file?.publicUrl) return;
    window.open(file.publicUrl, "_blank");
  };

  return (
    <div
      className="relative bg-white rounded-2xl shadow border transition hover:shadow-lg p-0 flex flex-col min-h-[290px] cursor-pointer"
      onDoubleClick={handleOpen}
      title="Double-click to open"
    >
      {/* Menu button */}
      <button
        className="absolute top-3 right-3 z-10 p-1 bg-white/80 rounded-full hover:bg-gray-100 transition"
        onClick={(e) => {
          e.stopPropagation(); // prevent double-click from firing
          setMenuOpen(!menuOpen);
        }}
        aria-label="Open file menu"
      >
        <img src={dots} alt="More" className="w-5 h-5" />
      </button>

      {menuOpen && (
        <div
          className="absolute top-9 right-3 bg-white shadow-xl rounded-xl w-44 z-30 border"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
            onClick={() => {
              onTrash?.(file);
              setMenuOpen(false);
            }}
          >
            Move to Trash
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
            onClick={() => {
              onFavorite?.(file);
              setMenuOpen(false);
            }}
          >
            Add to Favorites
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            onClick={() => {
              onDownload?.(file);
              setMenuOpen(false);
            }}
          >
            Download
          </button>
        </div>
      )}

      {/* Card content */}
      <div className="flex flex-col items-center px-6 py-5 pt-6">
        <div
          className="mb-2 w-full flex items-center gap-2 text-gray-600 text-base font-medium truncate"
          title={file?.name}
        >
          {isImage ? <span className="text-xl">🖼️</span> : <span className="text-xl">📄</span>}
          <span>{file?.name || "Unnamed File"}</span>
        </div>

        {/* Preview */}
        <div className="w-full flex-1 flex items-center justify-center min-h-[105px] bg-gray-50 rounded-lg mb-3">
          {isImage ? (
            <img
              src={previewSrc}
              alt={file.name}
              className="h-24 rounded-lg object-contain mx-auto"
              onError={(e) => (e.currentTarget.src = fileIcon)}
            />
          ) : (
            <img src={fileIcon} alt="file" className="h-14 w-14 opacity-70 mx-auto" />
          )}
        </div>
      </div>

      {/* Footer (avatar + timestamp) */}
      <div className="flex items-center gap-2 px-5 pb-4 pt-0">
        <img
          src={avatarImg}
          alt="Uploader"
          className="w-6 h-6 rounded-full border"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <span className="text-xs text-gray-800 line-clamp-1">{file.uploader || "Cody Seibert"}</span>
        <span className="text-xs text-gray-500 ml-auto">Uploaded just now</span>
      </div>
    </div>
  );
}