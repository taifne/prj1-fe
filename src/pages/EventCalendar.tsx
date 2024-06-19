import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {
  Eventcalendar,
  getJson,
  MbscCalendarEvent,
  MbscEventcalendarView,
  MbscEventClickEvent,
  setOptions,
  Toast,
} from '@mobiscroll/react';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import useCallAPIState from '@/hooks/UseCallAPIState';
import EventService from '@/services/EventService';
import { EventType } from '@/utils/types/event';
import { useAppSelector } from '@/hooks/useAppSelector';
import Breadcrumb from '@/components/BreadCrum/AutoMapBreadCrum'; 
setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const Calendar: FC = () => {
  const [myEvents, setEvents] = useState<MbscCalendarEvent[]>([]);
  const [isToastOpen, setToastOpen] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>();
  const isLoggedIn = useAppSelector((state) => state.auth.user.group);

  const [listStudy, setListStudy] = useCallAPIState<EventType[]>({ status: "IDLE", data: [] })
  const fetchGroups = useCallback(
    async () => {
      setListStudy("LOADING", [])
      const { statusCode, data } = await EventService.getAllEvent()

      if (statusCode === 200) {
        console.log(data,"---",isLoggedIn);
        setListStudy("SUCCESS", data)
        return
      }
      setListStudy("ERROR", [])
    }, [setListStudy]
  )

  useEffect(() => {
    console.log(isLoggedIn);
    fetchGroups()
  }, [fetchGroups])
  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events: MbscCalendarEvent[]) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventClick = useCallback((args: MbscEventClickEvent) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

  const view = useMemo<MbscEventcalendarView>(
    () => ({
      calendar: { labels: true },
    }),
    [],
  );

  return (
    <div className="p-8">
         <Breadcrumb url={location.pathname} />
      <Eventcalendar className='rounded-xl'
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        eventDelete={false}
        data={listStudy.data}
        view={view}
        onEventClick={handleEventClick}
      />
      <Toast message={toastText} isOpen={isToastOpen} onClose={handleToastClose} />
    </div>
  );
};
export default Calendar;