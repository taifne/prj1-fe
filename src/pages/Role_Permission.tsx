import { usersData } from '@/data/users-data';
import PageHeader from '@/components/Shared/page-header';
import ModalButton from '@/components/Shared/modal-button';
import RolesGrid from '@/components/Shared/roles-permissions/roles-grid';
import UsersTable from '@/components/Shared/roles-permissions/users-table';
import CreateRole from '@/components/Shared/roles-permissions/create-role';
import EventCalendarPage from '@/components/EventCalendar';
const pageHeader = {
  title: 'Roles and Permissions ',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Role Management & Permission',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New Role" view={<CreateRole />} />
      </PageHeader>
      <RolesGrid />
      <UsersTable data={usersData} />
   <EventCalendarPage />
    </>
  );
}
