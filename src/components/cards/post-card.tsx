import { getRandomColor } from '@/utils/helpers/color.generate';
import React from 'react';
import { Avatar } from 'rizzui';
import { FaEye } from "react-icons/fa";
import { StydyType } from '@/utils/types/study-post-type';
import UserLockIcon from '../icons/user-lock';
import UserInfoIcon from '../icons/user-info';
import { calculateTimeAgo } from '@/utils/TimeUntils';
interface StudyProps {
    event: StydyType;
}

const EventCard: React.FC<StudyProps> = ({ event }) => {
    const { title, description, startDay, endDay, createdBy, image, createdAt, updatedAt } = event;
    const randomColor = getRandomColor();

    return (
        <div className="bg-white shadow-md rounded-md p-4 pb-0  m-8 w-5/12 " >
            <h2 className="text-xl font-extrabold text-blue">{title}</h2>
            <div className="flex justify-start space-x-4">

                <p className="text-gray-600">Starts: {new Date(startDay).toLocaleDateString()}</p>
                <p className="text-gray-600">Ends: {new Date(endDay).toLocaleDateString()}</p>
               
            </div>
            <p className="text-gray-600 text-xl mb-2 ml-3 h-32 overflow-hidden">{description}</p>
          
          
           
            <div className="flex justify-start space-x-1 items-center">
                 <p className="text-gray-600 w-1/3">Created 
                 <span className="text-gray-500 text-sm mx-1">{calculateTimeAgo(new Date(createdAt))}</span></p>
            <p className="text-gray-600 w-1/3">Last Update   
             <span className="text-gray-500 text-sm mx-1">{calculateTimeAgo(new Date(updatedAt))}</span></p>
     

            <div className="flex items-center justify-end "> 
                 {createdBy.status ? (<UserInfoIcon className='w-4 h-4' />) : (<UserLockIcon className='w-4 h-4' />)}
            <p className="text-gray-600">Created By: <Avatar src={createdBy.avatar} name={createdBy.fullName} /></p></div>

            </div>
            <div className="w-full flex">
            <FaEye className="text-xl m-2" />
            <p className='m-2'>{Math.floor(Math.random() * 100)}</p>
            </div>
           
        </div>
    );
};

export default EventCard;
