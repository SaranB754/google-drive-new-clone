// import React, { useEffect, useState } from "react";
// import FileCardMenu from "./FileCardMenu";

// export default function TrashArea() {
//   const [files, setFiles] = useState([]);

//   // fetch trashed files
//   const fetchTrashedFiles = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/files/trashed");
//       const data = await res.json();
//       setFiles(data);
//     } catch (err) {
//       console.error("Error fetching trashed files:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTrashedFiles();
//   }, []);

//   // restore file
//   const handleRestore = async (file) => {
//     try {
//       await fetch(`http://localhost:5000/restore/${file.id}`, { method: "POST" });
//       fetchTrashedFiles(); // refresh list
//     } catch (err) {
//       console.error("Error restoring file:", err);
//     }
//   };

//   return (
//     <div className="p-4 grid grid-cols-3 gap-4">
//       {files.length === 0 ? (
//         <p className="text-gray-500">No files in trash</p>
//       ) : (
//         files.map((file) => (
//           <div key={file.id} className="relative border rounded p-4">
//             <p className="font-medium">{file.name}</p>
//             <FileCardMenu mode="trash" onRestore={() => handleRestore(file)} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
