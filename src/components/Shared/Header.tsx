import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/slices/auth";
import {
    LuUserCircle2,
    LuBell,
    LuXCircle,
    LuMenu,
    LuHome,
    LuLayoutDashboard,
    LuFileSpreadsheet,
    LuLayoutList,
    LuSettings,
    LuPalette,
    LuLogOut,
    LuMail,
    LuSettings2,
    LuBellRing,
    LuUser2,
    LuPanelRightClose,
} from "react-icons/lu";
import { useAppSelector } from "@/hooks/useAppSelector";
import toast from "react-hot-toast";
import { title } from "@/utils/constants";
import { BiChevronDown } from "react-icons/bi";
import { REQUEST_TYPE } from "@/utils/types";
import useFetch from "@/hooks/useFetch";

import { FaChevronDown } from "react-icons/fa";
import image1 from "../../../public/assets/images/hsoc-login/selogo.png";
import { useDispatch } from "react-redux";
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const { sendRequest } = useFetch();

    const navLinks = [
        {
            title: "bulletin",
            items: [
                {
                    title: "News",
                    icon: <LuPanelRightClose />,
                    link: "/bulletin/news",
                },
                { 
                    title: "calendar events",
                 icon: <LuHome />,
                  link: "/bulletin/events" 
                },
                {
                    title: "TOP Q&A",
                    icon: <LuLayoutDashboard />,
                    link: "/bulletin/topqa",
                },
                
            ],
        },
        {
            title: "management",
            items: [
                {
                    title: "Users",
                    icon: <LuPanelRightClose />,
                    link: "/management/users",
                },
                { 
                    title: "Posts",
                 icon: <LuHome />,
                  link: "/management/posts", 
                },
                {
                    title: "Groups",
                    icon: <LuLayoutDashboard />,
                    link: "/management/groups",
                },
                {
                    title: "Roles&Permissions",
                    icon: <LuLayoutDashboard />,
                    link: "/management/roles",
                },
                
            ],
        },
       
    ];

    const handleToggleSidebar = () => {
        setIsShowSidebar((previousState) => !previousState);
    };

    const handleToggleMenu = () => {
        setIsShowMenu((previousState) => !previousState);
    };

    const handleSettings = () => {
        toast.success("Open modal settings");
    };

    const handleSelect = (path: string) => {
        if (path.length > 0) navigate(path);
        setIsShowSidebar(false);
    };

    const handleLogout = () => {
        console.log('logout');
        dispatch(logout());
       // sendRequest({ type: REQUEST_TYPE.LOGOUT });
    };
    const menuItems = [
        {
            title: "Bulletin",
            icon: FaChevronDown,
            content: [
                { name: "News", path: "/bulletin/news" },
                { name: "calendar events", path: "/bulletin/events" },
                { name: "TOP Q&A", path: "/bulletin/topqa" }
            ],
        },
        {
            title: "Management",
            icon: FaChevronDown,
            content: [
                { name: "User", path: "/management/users" },
                { name: "Post", path: "/management/posts" },
                { name: "Group", path: "/management/groups" },
                { name: "Roles & Permissions", path: "/management/roles" }
            ],
        }
    ];

    function renderMenu() {
        return menuItems.map((item, index) => (
            <div key={index} className="relative group">
                <span className="text-white font-bold text-sm p-3 hover:cursor-pointer flex items-center gap-2">
                    {item.title} <FaChevronDown />
                </span>
                <div className="absolute w-60 hidden group-hover:block max-h-[700px] overflow-auto py-2">
                    <div className="h-5 bg-transparent"></div>
                    <div className="bg-black backdrop-blur-[2px] border-2 border-blue-500 text-center rounded-md shadow-2xl text-white">
                        {item.content.map((contentItem, index) => (
                            <Link to={contentItem.path} key={index}>
                                <p
                                    key={index}
                                    className="hover:bg-gray-900 font-medium text-sm rounded-md p-2 hover:cursor-pointer"
                                >
                                    {contentItem.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        ));
    }

    const [openMenus, setOpenMenus] = useState<any>({});

    const handleMenuClick = (name: string) => {
        setOpenMenus((prevOpenMenus: any) => ({
            ...prevOpenMenus,
            [name]: !prevOpenMenus[name],
        }));
    };

    return (
        <>
            {isShowSidebar && (
                <div
                    onClick={() => setIsShowSidebar(false)}
                    className="fixed z-10 inset-0 "
                >
                    <div
                        style={{
                            maxHeight: "calc(100% - var(--hex-header-height)",
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className="fixed border-2 border-blue-500 bg-black z-50 left-4 top-[var(--hex-header-height)]  flex flex-col w-64 px-4 p-4 overflow-y-auto rounded-lg"
                    >
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((group) => {
                                return (
                                    <div
                                        key={group.title}
                                        className="flex flex-col gap-1"
                                    >
                                        <div
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleMenuClick(group.title);
                                            }}
                                            className="text-base font-bold text-white uppercase ml-2 flex items-center justify-between gap-4"
                                        >
                                            {group.title}
                                            {group.items?.length > 0 && (
                                                <BiChevronDown
                                                    className={`text-lg cursor-pointer ${
                                                        openMenus[group.title]
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            )}
                                        </div>
                                        {!openMenus[group.title] &&
                                            group.items.map((item) => {
                                                return (
                                                    <div
                                                        key={item.title}
                                                        onClick={() =>
                                                            handleSelect(
                                                                item.link
                                                            )
                                                        }
                                                        className="cursor-pointer font-semibold text-yellow-500/90 flex items-center gap-1 p-2 rounded-lg hover:bg-white/20"
                                                    >
                                                        {item.icon}
                                                        {item.title}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}
            <header className="z-20 relative backdrop-blur-[2px] bg-black/50 grid grid-cols-3 items-center px-4 bg-blue-dark">
                <div className="flex items-center gap-5 ">
                    {/* <div
                        onClick={handleToggleSidebar}
                        className="cursor-pointer text-white text-2xl w-fit flex gap-5 items-center"
                    >
                        {isShowSidebar ? <LuXCircle /> : <LuMenu />}
                    </div> */}
                    <Link to={"/"}>
                        <div className="flex  items-center gap-2 p-2">
                            <img
                                className="w-16 h-16 aspect-square"
                                src={image1}
                                alt="Logo"
                            />
                            <h1 className="font-bold text-2xl text-white uppercase">
                                {title}
                            </h1>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-1 justify-center items-center gap-10 ">
                    <div className="flex text-lg gap-5">{renderMenu()}</div>
                </div>

                <div className="flex gap-4 justify-end items-center text-white">
                    <div className="group cursor-pointer">
                        <LuBell className="group-hover:hidden text-2xl" />
                        <LuBellRing className="hidden group-hover:block text-2xl" />
                    </div>
                    <div
                        onClick={handleToggleMenu}
                        className="cursor-pointer text-white text-2xl w-fit"
                    >
                        {isShowMenu ? <LuXCircle /> : <LuUserCircle2 />}
                    </div>
                </div>
            </header>
            {isShowMenu && (
                <div
                    onClick={() => setIsShowMenu(false)}
                    className="fixed top-11 z-50 inset-0"
                >
                    <div
                        onClick={(event) => event.stopPropagation()}
                        className="absolute z-50 border-2 border-blue-500 bg-black/90 rounded-lg rounded-t-none top-12 right-4 flex-col w-64 px-4 pb-8 pt-12 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <div className="text-sm text-blue-500 font-medium uppercase ml-2">
                                    Information
                                </div>
                                <div className="flex items-center text-white gap-1 p-2 rounded-lg">
                                    <LuUser2 />
                                    {user.name}
                                </div>
                                <div className="flex items-center text-white gap-1 p-2 rounded-lg">
                                    <LuMail />
                                    {user.email}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-sm text-blue-500 font-bold uppercase ml-2">
                                    Account
                                </div>
                                <div
                                    onClick={handleSettings}
                                    className="cursor-pointer flex items-center text-white gap-1 p-2 rounded-lg hover:bg-white/20"
                                >
                                    <LuSettings2 />
                                    Settings
                                </div>
                                <div
                                    onClick={handleLogout}
                                    className="cursor-pointer text-white font-bold flex items-center gap-1 p-2 rounded-lg hover:bg-white/20"
                                >
                                    <LuLogOut />
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
