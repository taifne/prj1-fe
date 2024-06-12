import { getRandomColor } from '@/utils/helpers/color.generate';
import React from 'react';
import { Avatar } from 'rizzui';

import { Question } from '@/utils/types/question';
import UserLockIcon from '../icons/user-lock';
import UserInfoIcon from '../icons/user-info';
import { Link } from 'react-router-dom';
interface StudyProps {
    event: Question;
}

const QuestionCard: React.FC<StudyProps> = ({ event }) => {
    const { title,body, votes, user, createdAt,_id } = event;
    const randomColor = getRandomColor();

    return (
        <a href={`/bulletin/topqa/${_id}`} >
        <div className="bg-white shadow-md rounded-md p-2  mx-3 my-3 w-2/5" style={{ backgroundColor: randomColor }}>
           <div className="w-1/5">
            <div className="p2">
                <button>
                    up
                </button>
                <h3>{votes}</h3>
                <button>
                    down
                </button>
            </div>
           </div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-600 mb-2">{body}</p>
          
            {user ? (<UserInfoIcon className='w-4 h-4' />):(<UserLockIcon className='w-4 h-4' />)}
            <p className="text-gray-600">Created By: <Avatar src={user.avatar} name={user.fullName} /></p>
          
          
        </div>
        </a>
    );
};

export default QuestionCard;
