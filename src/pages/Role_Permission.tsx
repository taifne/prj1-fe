import { usersData } from '@/data/users-data';
import PageHeader from '@/components/Shared/page-header';
import ModalButton from '@/components/Shared/modal-button';
import RolesGrid from '@/components/Shared/roles-permissions/roles-grid';
import UsersTable from '@/components/Shared/roles-permissions/users-table';
import CreateRole from '@/components/Shared/roles-permissions/create-role';
import EventCalendarPage from '@/components/EventCalendar';
import { useCallback, useEffect, useState } from "react";
import useCallAPIState from "@/hooks/UseCallAPIState";
import UserService from "@/services/UserService";
import { User } from "@/types/User";
import Rendering from '@/components/ConditionRender/RenderState';
import GroupService from '@/services/GroupService';

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
  const [allUser, setAllUser] = useCallAPIState<User[]>({ status: "IDLE", data: [] })
  const [allGroup, setAllGroup] = useCallAPIState<User[]>({ status: "IDLE", data: [] })
  const fetchAllUser = useCallback(
    async () => {
      setAllUser("LOADING", []); // Corrected syntax
      try {
        const { data, statusCode } = await UserService.getAllUsers();
        if (statusCode === 200) {
          setAllUser("SUCCESS", data); // Corrected syntax
        } else {
          setAllUser("ERROR", []); // Provide an empty array for error case
        }
      } catch (error) {
        console.error("Error fetching all users:", error);
        setAllUser("ERROR", []); // Handle error and set status to ERROR
      }
    },
    [setAllUser]
  );
 

  useEffect(() => {
    fetchAllUser()
 

  }, [fetchAllUser]);

  return (
    <>
      <PageHeader className='flex flex-row justify-between items-center  p-8 ' title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton className='w-1/5 ' label="Add New Role" view={<CreateRole />} />
      </PageHeader>
      <RolesGrid className='px-8' />
      <Rendering   loading={allUser.loading}
                        success={allUser.success}
                        error={allUser.error}>
 
          <UsersTable data={allUser.data} />



     


    
      </Rendering>


    </>
  );
}
