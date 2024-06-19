import React, { useCallback, useEffect } from 'react';
import Breadcrumb from '@/components/BreadCrum/AutoMapBreadCrum'; // Adjust the path as per your project structure
import { useLocation } from 'react-router-dom';
import StudyService from '@/services/StudyService';
import { useDispatch } from 'react-redux';
import useCallAPIState from '@/hooks/UseCallAPIState';
import { StydyType } from '@/utils/types/study-post-type';
import Rendering from '@/components/ConditionRender/RenderState';
import { getRandomColor } from '@/utils/helpers/color.generate';

import EventCard from '@/components/cards/post-card';
const Homepage: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const dispatch = useDispatch();
  const randomColor = getRandomColor();
  const [listStudy, setListStudy] = useCallAPIState<StydyType[]>({ status: "IDLE", data: [] })
  const fetchGroups = useCallback(
    async () => {
      setListStudy("LOADING", [])
      const { statusCode, data } = await StudyService.getAllStudyPosts()

      if (statusCode === 200) {
        console.log("hihihihihihhi");
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
    <div className='bg-white  px-8'>
      <Breadcrumb url={location.pathname} />
      <Rendering loading={listStudy.loading}
        success={listStudy.success}
        error={listStudy.error}>


        <div className="flex flex-row flex-wrap justify-center   content-start w-full  rounded-sm  border-spacing-0.5 border-secondary-dark ">
          {listStudy.data.map(post => (
            <EventCard event={post} />

          ))}</div>

      </Rendering>

    </div >
  );
};

export default Homepage;
