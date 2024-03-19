import BasicTableWidget from "./Table";
import { getColumns as getOrderColumns } from "./Column";
import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { REQUEST_TYPE } from "../../../utils/types";
import GlobalModal from "../Modal";
export const orderData = [
    {
        id: "2222",
        tenant: "Company X",
        ticket: "Network outage investigation",
        name: "John Cena",
        email: "john.smith@example.com",
        status: "Closed",
        duration: 30,
        servity: "Medium",
        createdAt: "2022-10-20T14:00:00.000Z",
        updatedAt: "2023-11-10T12:45:33.567Z",
        comments: [
            {
                username: "mno",
                avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-18.webp",
                createdAt: "2023-10-21T08:30:00.987Z",
                commentContent: "Lorem ipsum dolor sit amet.",
            },
            {
                username: "pqr",
                avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-19.webp",
                createdAt: "2023-10-25T11:20:15.222Z",
                commentContent: "Consectetur adipiscing elit.",
            },
        ],
    },
    {
        id: "3333",
        tenant: "Company Y",
        ticket: "Supply Chain Attacks",
        name: "Jack Smith",
        email: "johnavds.smith@example.com",
        status: "Open",
        duration: 200,
        servity: "High",
        createdAt: "2022-08-20T14:00:00.000Z",
        updatedAt: "2023-12-10T12:45:33.567Z",
        comments: [
            {
                username: "Jesica Junio",
                avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-18.webp",
                createdAt: "2023-04-10T10:45:33.567Z",
                commentContent: "Lorem ipsum dolor sit amet.",
            },
            {
                username: "Jesica Junio",
                avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-18.webp",
                createdAt: "2023-04-10T10:45:33.567Z",
                commentContent: "Lorem ipsum dolor sit amet.",
            },
        ],
    },
    {
        id: "5555",
        tenant: "Company Z",
        ticket: "Mobile Threats",
        name: "Jesica Junior",
        email: "esica.smith@example.com",
        status: "In progress",
        duration: 20,
        servity: "Low",
        createdAt: "2022-05-15T14:00:00.000Z",
        updatedAt: "2023-04-10T11:45:33.567Z",
        comments: [
            {
                username: "Jesica Junio",
                avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-18.webp",
                createdAt: "2023-04-10T10:45:33.567Z",
                commentContent:
                    "Lorem ipsum dolor sit ametLorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet..",
            },
            {
                username: "Neymar",
                avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-18.webp",
                createdAt: "2023-02-10T10:45:33.567Z",
                commentContent:
                    "Lorem ipsum dolor sit ametLorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet..",
            },
            {
                username: "Ronaldo ",
                avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-18.webp",
                createdAt: "2023-02-10T10:45:33.567Z",
                commentContent:
                    "Lorem ipsum dolor sit ametLorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet..",
            },
        ],
    },
    {
        id: "6666",
        tenant: "Company W",
        ticket: "Remote Access Vulnerabilities",
        name: "Jack 5Mil",
        email: "jack@example.com",
        status: "Closed",
        duration: 100,
        servity: "Medium",
        createdAt: "2022-03-20T14:00:00.000Z",
        updatedAt: "2023-06-10T12:45:33.567Z",
        comments: [],
    },
    {
        id: "7777",
        tenant: "Company T",
        ticket: "Ransomware",
        name: "Nancy",
        email: "Nancy.smith@example.com",
        status: "Open",
        duration: 200,
        servity: "High",
        createdAt: "2022-02-20T14:00:00.000Z",
        updatedAt: "2023-11-10T12:45:33.567Z",
        comments: [
            {
                username: "Jesica Junio",
                avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-18.webp",
                createdAt: "2023-04-10T10:45:33.567Z",
                commentContent: "Lorem ipsum dolor sit amet.",
            },
            {
                username: "Jesica Junio",
                avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-18.webp",
                createdAt: "2023-04-10T10:45:33.567Z",
                commentContent: "Lorem ipsum dolor sit amet.",
            },
            {
                username: "Jesica Junio",
                avatar: "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-18.webp",
                createdAt: "2023-04-10T10:45:33.567Z",
                commentContent: "Lorem ipsum dolor sit amet.",
            },
        ],
    },
    {
        id: "8888",
        tenant: "Company R",
        ticket: "Vishing",
        name: "Robert",
        email: "Robert.smith@example.com",
        status: "In progress",
        duration: 40,
        servity: "Medium",
        createdAt: "2021-02-20T14:00:00.000Z",
        updatedAt: "2022-11-10T12:45:33.567Z",
        comments: [],
    },
];
const Main = () => {
    const { isLoading, sendRequest } = useFetch();

    useEffect(() => {
        if (isLoading) return;
        sendRequest({ type: REQUEST_TYPE.USER });
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 gap-6 3xl:gap-8 shadow-2xl ">
                {orderData ? (
                    <BasicTableWidget
                        variant="classic"
                        className="opacity-90 shadow-2xl dark:bg-transparent-500 mx-5"
                        data={orderData}
                        enableSearch
                        enablePagination
                        getColumns={getOrderColumns}
                    />
                ) : (
                    <div>Loading ...</div>
                )}
            </div>
            <GlobalModal />
        </>
    );
};

export default Main;
