import { metaObject } from '@/config/site.config';
import EventCalendarView from '@/components/Shared/event-calendar';
import EventPageHeader from '@/components/Shared/event-calendar/event-page-header';

export const metadata = {
  ...metaObject('Event Calendar'),
};

export default function EventCalendarPage() {
  return (
    <>
      <EventPageHeader />
      <div className="w-1/2">  <EventCalendarView /></div>
    
    </>
  );
}
