// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import ProjectPage from "./pages/ProjectPage";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import FileArea from "./components/FileArea";

// export default function Frontend() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default → redirect to login */}
//         <Route path="/" element={<Navigate to="/login" />} />

//         <Route path="/login" element={<LoginPage />} />

//         <Route
//           path="/project"
//           element={
//             <div className="flex">
//               <Sidebar />
//               <div className="flex-1">
//                 <Navbar />
//                 <FileArea />
//                 <ProjectPage />
//               </div>
//             </div>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }
// src/client/frontend.jsx

// src/client/frontend.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";

export default function Frontend() {
  return (
    <Router>
      <Routes>
        {/* Login Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Project Page */}
        <Route path="/project" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}
