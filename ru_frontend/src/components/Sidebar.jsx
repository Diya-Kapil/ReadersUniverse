import { NavLink, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiHeart,
  FiUsers,
  FiSettings,
  FiInfo,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "My Profile", icon: <FiUser />, path: "/profile" },
    { name: "My Favourites", icon: <FiHeart />, path: "/favourites" },
    { name: "My Matches", icon: <FiUsers />, path: "/matches" },
  ];

  const bottomItems = [
    { name: "Settings", icon: <FiSettings />, path: "/settings" },
    { name: "About", icon: <FiInfo />, path: "/about" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`group h-screen bg-black/30 backdrop-blur-md text-white fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out w-20 hover:w-64 flex flex-col justify-between border-r border-white/10`}
    >
      {/* Top - Brand */}
      <div>
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 px-4 py-5 cursor-pointer"
        >
          <FiMenu size={22} className="text-white" />
          <span className="text-xl font-bold whitespace-nowrap transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            ReadersUniverse
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="mt-2">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 hover:bg-indigo-600 rounded-r-full mx-2 transition-all ${
                  isActive
                    ? "bg-indigo-700 text-white font-semibold"
                    : "text-gray-300"
                }`
              }
            >
              <span>{item.icon}</span>
              <span className="transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom - Settings, About, Logout */}
      <div className="mb-4">
        {bottomItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3 hover:bg-indigo-600 rounded-r-full mx-2 transition-all ${
                isActive
                  ? "bg-indigo-700 text-white font-semibold"
                  : "text-gray-300"
              }`
            }
          >
            <span>{item.icon}</span>
            <span className="transition-opacity duration-200 opacity-0 group-hover:opacity-100">
              {item.name}
            </span>
          </NavLink>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-4 px-5 py-3 hover:bg-indigo-600 rounded-r-full mx-2 transition-all text-gray-300"
        >
          <FiLogOut />
          <span className="transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
