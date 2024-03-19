import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { GoProjectRoadmap } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { title } from "@/utils/constants";
import { Link } from "react-router-dom";
type OpenMenus = {
  [key: string]: boolean;
};
const Sidebar = () => {
  const navLinks = [
    { icon: <AiOutlineHome />, name: "Home", href: "#home", children: [] },
    {
      icon: <LuLayoutDashboard />,
      name: "Dashboard",
      href: "#dashboard",
      children: [
        { name: "Dashboard 1", href: "#Dashboard1" },
        { name: "Dashboard 2", href: "#Dashboard2" },
      ],
    },
    {
      icon: <GoProjectRoadmap />,
      name: "Projects",
      href: "#projects",
      children: [
        { name: "Project 1", href: "#project1" },
        { name: "Project 2", href: "#project2" },
      ],
    },
    { icon: <BsListTask />, name: "Tasks", href: "#tasks", children: [] },
    {
      icon: <AiOutlineUser />,
      name: "Users",
      href: "#users",
      children: [],
    },
    {
      icon: <LuSettings />,
      name: "Settings",
      href: "#settings",
      children: [],
    },
  ];

  const [openMenus, setOpenMenus] = useState<OpenMenus>({});

  const handleMenuClick = (name: string) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [name]: !prevOpenMenus[name],
    }));
  };

  return (
    <aside className="text-white rounded-lg glassmorphism flex flex-col w-64 h-screen px-5 py-8 overflow-y-hidden border-r rtl:border-r-0 rtl:border-l">
      <Link to={"/"}>
        <div className="flex justify-center items-center gap-2">
          <h1 className="font-bold text-2xl uppercase">{title}</h1>
        </div>
      </Link>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex-1 -mx-3 space-y-3">
          {navLinks.map((link) => (
            <div key={link.name}>
              <a
                className={`flex items-center justify-between px-3 py-2 transition-colors duration-300 transform rounded-lg hover:bg-gray-600 text-white ${
                  link.children.length > 0 ? "cursor-pointer" : ""
                }`}
                onClick={(e) => {
                  if (link.children.length > 0) {
                    e.preventDefault();
                    handleMenuClick(link.name);
                  }
                }}
                href={link.children.length === 0 ? link.href : undefined}
              >
                <span className="flex items-center">
                  {link.icon}
                  <span className="mx-2 font-bold">{link.name}</span>
                </span>
                {link.children.length > 0 && (
                  <BiChevronDown
                    className={`text-lg ${
                      openMenus[link.name] ? "rotate-180" : ""
                    }`}
                  />
                )}
              </a>
              {openMenus[link.name] && (
                <div className="ml-4 ">
                  {link.children.map((child) => (
                    <a
                      key={child.name}
                      className="block px-3 py-2 text-white transition-colors duration-300 transform rounded-lg hover:bg-gray-500"
                      href={child.href}
                    >
                      <span className="mx-2 font-medium">{child.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-6">
          <div className="flex items-center justify-between mt-6">
            <a href="#" className="flex items-center gap-x-2">
              <RxAvatar className="text-xl" />
              <span className="font-bold text-gray-700 dark:text-gray-200">
                HPT
              </span>
            </a>
            <a href="#" className="transition-colors duration-200 rtl:rotate-0">
              <FiLogOut />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
