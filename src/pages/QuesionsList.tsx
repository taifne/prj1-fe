import React, { useCallback, useEffect } from 'react';
import Breadcrumb from '@/components/BreadCrum/AutoMapBreadCrum'; // Adjust the path as per your project structure
import { useLocation } from 'react-router-dom';
import QuesService from '@/services/QuesService';
import { useDispatch } from 'react-redux';
import useCallAPIState from '@/hooks/UseCallAPIState';
import { Question } from '@/utils/types/question';
import Rendering from '@/components/ConditionRender/RenderState';
import QuestionCard from '@/components/cards/question';
const QuestionPage: React.FC = () => {
    const location = useLocation();
    const [listStudy, setListStudy] = useCallAPIState<Question[]>({ status: "IDLE", data: [] })
    const fetchGroups = useCallback(
        async () => {
            setListStudy("LOADING", [])
            const { statusCode, data } = await QuesService.getAllQuestion()

            if (statusCode === 200) {
                console.log(data)
                setListStudy("SUCCESS", data)
                return
            }
            setListStudy("ERROR", [])
        }, [setListStudy]
    )

    useEffect(() => {
        console.log(location.pathname);
        fetchGroups()
    }, [fetchGroups])


    return (
        <div className='bg-white p-5'>

            <Rendering loading={listStudy.loading}
                success={listStudy.success}
                error={listStudy.error}>


                <div className="flex flex-row flex-wrap justify-start content-start w-full  rounded-sm p-5 border-spacing-0.5 border-secondary-dark ">
                    {listStudy.data.map(post => (
                        <QuestionCard event={post} />

                    ))}</div>

            </Rendering>

        </div >
    );
};

export default QuestionPage;
