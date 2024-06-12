import { getRandomColor } from '@/utils/helpers/color.generate';
import React from 'react';
import { Avatar } from 'rizzui';

import { StydyType } from '@/utils/types/study-post-type';
import UserLockIcon from '../icons/user-lock';
import UserInfoIcon from '../icons/user-info';
interface StudyProps {
    event: StydyType;
}

const EventCard: React.FC<StudyProps> = ({ event }) => {
    const { title, description, startDay, endDay, createdBy, image, createdAt, updatedAt } = event;
    const randomColor = getRandomColor();

    return (
        <div className="bg-white shadow-md rounded-md p-2  mx-2 my-5 w-2/5 " >
            <h2 className="text-lg font-extrabold text-blue">{title}</h2>
            <div className="flex justify-start space-x-4">

                <p className="text-gray-600">Starts: {new Date(startDay).toLocaleDateString()}</p>
                <p className="text-gray-600">Ends: {new Date(endDay).toLocaleDateString()}</p>
            </div>
            <p className="text-gray-600 mb-2">{description}</p>
            <div className="flex items-center justify-end"> 
                 {createdBy.status ? (<UserInfoIcon className='w-4 h-4' />) : (<UserLockIcon className='w-4 h-4' />)}
            <p className="text-gray-600">Created By: <Avatar src={createdBy.avatar} name={createdBy.fullName} /></p></div>

          
           
            <div className="flex justify-start space-x-1">
                 <p className="text-gray-600 w-1/3">Created At: {new Date(createdAt).toLocaleString()}</p>
            <p className="text-gray-600 w-1/3">Updated At: {new Date(updatedAt).toLocaleString()}</p>
            <button  className='rounded bg-gray-400 w-fit px-1 ml-3'>Xem them</button>
            </div>
           
        </div>
    );
};

export default EventCard;
