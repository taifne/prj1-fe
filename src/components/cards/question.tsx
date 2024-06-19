import { getRandomColor } from '@/utils/helpers/color.generate';
import React from 'react';
import { Avatar } from 'rizzui';
import { LuArrowBigDown } from "react-icons/lu";
import { LuArrowBigUp } from "react-icons/lu";
import { Question } from '@/utils/types/question';
import UserLockIcon from '../icons/user-lock';
import UserInfoIcon from '../icons/user-info';
import { Link } from 'react-router-dom';
import { TbMessage2 } from "react-icons/tb";
import { FaShareNodes } from "react-icons/fa6";
import { calculateTimeAgo } from '@/utils/TimeUntils';
import { HiDotsHorizontal } from "react-icons/hi";
interface StudyProps {
    event: Question;
}

const QuestionCard: React.FC<StudyProps> = ({ event }) => {
    const { title, body, votes, user, createdAt, _id } = event;
    const randomColor = getRandomColor();
    const classNames = ["w-1/2", "w-2/5", "w-3/5","w-4/5","w-1/3"];

    return (

        <div className={`bg-white shadow-md rounded-md px-10 py-3  mx-3 my-3 mb-4 flex flex-col ${classNames[Math.floor(Math.random() * classNames.length)]}`} >
            <div className="flex justify-start items-center space-x-3 my-2 w-full">
                <Avatar src={user.avatar} name={user.fullName} />
                <p className="text-gray-600 font-semibold"> {user.fullName} </p>
                <span className="text-gray-500 text-sm mx-1">{calculateTimeAgo(new Date(user.createdAt))}</span>
                <HiDotsHorizontal className='justify-self-end text-xl'/>
            </div>
            <a href={`/bulletin/topqa/${_id}`} className='w-full'>
                <h2 className="text-lg font-semibold my-2">{title}</h2>
                <p className="text-gray-600 my-2">{body}</p>
            </a>
            <div className="flex justify-start items-center space-x-7 p-1 w-full  my-2">
                <div className="px-3 py-2 flex items-center space-x-2 bg-gray-200 rounded-xl hover:scale-110">
                    <LuArrowBigDown className='text-2xl hover:scale-105' />
                    <p>{Math.floor(Math.random() * 100)}</p>
                    <LuArrowBigUp className='text-2xl hover:scale-105' />


                </div>
                <div className="px-3 py-2 flex items-center space-x-2 bg-gray-200 rounded-xl hover:scale-110">
                    <TbMessage2 className='text-2xl hover:scale-105' />
                    <p>{Math.floor(Math.random() * 100)}</p>
                </div>
                <div className="px-3 py-2 flex items-center space-x-2 bg-gray-200 rounded-xl  hover:scale-110">
                    <FaShareNodes className='text-2xl hover:scale-105' />
                    <p>Share</p>
                </div>
            </div>
        </div>


    );
};

export default QuestionCard;
