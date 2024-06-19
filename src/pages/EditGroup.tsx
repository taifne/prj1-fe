"use client";
import React, { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import useCallAPIState from "@/hooks/UseCallAPIState";
import QuesService from "@/services/QuesService";
import { CommentData } from "@/types/Comment";
import Comment from "@/components/comentBox";
import { User } from "@/types/User";
import UserService from "@/services/UserService";
import UserComponent from "@/components/UserIcon";
import CommentServce from "@/services/CommentService";
import RenderState from '@/components/ConditionRender/RenderState';
import Breadcrumbs from "@/components/BreadCrum/AutoMapBreadCrum";
import Rendering from '@/components/ConditionRender/RenderState';
import { FaExchangeAlt } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {
    Modal,
    Button,
    Text,
    ActionIcon,
    Input,
    Password,
    Checkbox,
} from "rizzui";

import { BsSendArrowDownFill } from "react-icons/bs";
import { Question } from "@/types/Ques";
import { useParams } from "react-router-dom";
import GroupService from "@/services/GroupService";

const PostPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [myArray, setMyArray] = useState<string[]>([]);
    const [groupColor, setGroupColor] = useState<string>();
    const [groupName, setGroupName] = useState<string>();

    // Function to add or remove a string from the array
    const toggleStringInArray = (str: string) => {
        setMyArray(prevArray =>
            prevArray.includes(str)
                ? prevArray.filter(item => item !== str)
                : [...prevArray, str]
        );
    };
    const [allGroup, setAllGroup] = useCallAPIState<Partial<Group>>({ status: "IDLE", data: {} })
    const fetchAllGroup = useCallback(
        async () => {
            setAllGroup("LOADING", {}); // Corrected syntax
            try {
                const { data, statusCode } = await GroupService.getGroupById(id ?? "");



                if (statusCode === 200) {
                    setGroupColor(data.color);
                    setGroupName(data.name)
                    setMyArray(data.users.map((love: any) => (love._id ?? "")));
                    setAllGroup("SUCCESS", data); // Corrected syntax
                } else {
                    setAllGroup("ERROR", {}); // Provide an empty array for error case
                }
            } catch (error) {
                console.error("Error fetching all groups:", error);
                setAllGroup("ERROR", {}); // Handle error and set status to ERROR
            }
        },
        [setAllGroup]
    );

    useEffect(() => {
        fetchAllGroup()


    }, [setAllGroup]);
    const [allUser, setAllUser] = useCallAPIState<GroupUser[]>({ status: "IDLE", data: [] })
    const fetchAllUser = useCallback(
        async () => {
            setAllGroup("LOADING", {}); // Corrected syntax
            try {
                const { data, statusCode } = await UserService.getAllUsers();

                if (statusCode === 200) {
                    setAllUser("SUCCESS", data); // Corrected syntax
                } else {
                    setAllUser("ERROR", []); // Provide an empty array for error case
                }
            } catch (error) {
                console.error("Error fetching all groups:", error);
                setAllUser("ERROR", []); // Handle error and set status to ERROR
            }
        },
        [setAllGroup]
    );

    useEffect(() => {
        fetchAllUser()


    }, [setAllUser]);

    return (
        <>
            <div className="flex bg-white py-3 px-12 ">   <Breadcrumbs url={`management/roles/${allGroup.data.name}`} /></div>
            <div className="w-full h-fit flex">
                <Rendering loading={allGroup.loading}
                    success={allGroup.success}
                    error={allGroup.error}>
                    <div className="w-2/5 flex flex-col p-4 space-x-10 border-r-4 border-x-blue-light">
                        <div className="w-full flex flex-col ">
                            <div className="w-full flex justify-center">
                                <p className="text-xl font-bold">Group Name</p>
                            </div>
                            <div className="w-full flex items-center mb-10">
                                <div className="w-2/5 flex flex-col">
                                    <div className="w-full text-center">
                                        <p className="m-2">Old Group Name</p>
                                    </div>
                                    <div className="flex w-full justify-center items-center">
                                        <MdDriveFileRenameOutline className="m-2 text-xl" />

                                        <p className="m-2">{allGroup?.data?.name}</p>
                                    </div>

                                </div>
                                <FaExchangeAlt className="text-3xl" />
                                <div className="w-2/5">
                                    <div className="w-full text-center">
                                        <p className="m-2">New Group Name</p>
                                    </div>
                                    <div className="flex w-full justify-center items-center">
                                        <MdDriveFileRenameOutline className="m-2 text-xl" />

                                        <input value={groupName} onChange={(e) => setGroupName(e.target.value)} className="border-2 rounded-md m-2" type="text"></input>
                                    </div>
                                </div>
                            </div>


                            <div className="w-full flex justify-center">
                                <p className="text-xl font-bold">Group Color</p>
                            </div>
                            <div className="w-full flex items-center mb-10">
                                <div className="w-2/5 flex flex-col">
                                    <div className="w-full text-center">
                                        <p className="m-2">Old Group Color</p>
                                    </div>
                                    <div className="flex w-full justify-center items-center">
                                        <MdDriveFileRenameOutline className="m-2 text-xl" />

                                        <input value={allGroup.data.color}type="color" className="m-2"></input>
                                    </div>

                                </div>
                                <FaExchangeAlt className="text-3xl" />
                                <div className="w-2/5">
                                    <div className="w-full text-center">
                                        <p className="m-2">New Group Color</p>
                                    </div>
                                    <div className="flex w-full justify-center items-center">
                                        <MdDriveFileRenameOutline className="m-2 text-xl" />

                                        <input  type="color" value={groupColor} onChange={(e) => setGroupColor(e.target.value)}  className="border-2 rounded-md m-2" ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-center">
                                <p className="text-xl font-bold">Group Permissions</p>
                            </div>
                            <div className="w-full flex">
                                {
                                    allGroup.data?.permissions?.map(
                                        (hihi) =>
                                        (
                                            <div className="w-2/5 p-2 rounded-md bg-gray-600 text-white hover:scale-105 m-4">
                                                {
                                                    hihi
                                                }
                                            </div>
                                        )

                                    )

                                }
                            </div>

                        </div>

                    </div>

                    <div className="w-3/5 p-4">
                        <div className="w-full flex justify-center mb-5">
                            <p className="text-xl font-bold">Group User</p>
                        </div>
                        <table className="min-w-full bg-white p-3">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="text-md py-2 px-4">Select</th>
                                    <th className="text-md py-2 px-4">Name</th>
                                    <th className="text-md  py-2 px-4">Email</th>
                                    <th className="text-md  py-2 px-4">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUser.data?.map((item, index) => (
                                    <tr onClick={() => { toggleStringInArray(item._id) }} key={index} className={`bg-gray-100 border-b ${myArray?.some((user) => user === item._id) ? "bg-gray-600 text-white" : ""}`}>
                                        <td className="py-2 px-4" >
                                            <input className="rounded-xl text-white text-sm" type="checkbox" checked={myArray?.some((user) => user === item._id)}></input>
                                        </td>
                                        <td className="py-2 px-4">{item.fullName}</td>
                                        <td className="py-2 px-4">{item.email}</td>
                                        <td className="py-2 px-4">{item.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </Rendering>
            </div>
            <div className="w-full text-center">
                <button
                    onClick={async () => {
                        await GroupService.updateGroup(id ?? "", {


                            name: groupName,
                            users: myArray,

                            color: groupColor

                        });
                        window.location.reload();
                    }}
                    className="hover:scale-105 bg-secondary-light rounded-xl text-white text-xl font-bold p-4"> Change</button>
            </div>

        </>


    );
};

export default PostPage;

