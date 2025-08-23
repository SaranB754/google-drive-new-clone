import logo from '../assets/logo.png';
import teamIcon from '../assets/group.png';
import user from '../assets/profile.png';
export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-10 w-10" />
        <span className="font-semibold text-lg">FileDrive</span>
      </div>

      <button className="border rounded px-4 py-1">Your Files</button>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1 rounded bg-indigo-600 text-white">
          <img src={teamIcon} alt="Team Icon" className="h-5 w-5" />
          Another Team
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <img src={user} alt="User" className="h-10 w-10 rounded-full" />
      </div>
    </header>
  );
}
