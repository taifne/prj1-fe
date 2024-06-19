import RoleCard from '@/components/Shared/roles-permissions/role-card';
import useCallAPIState from '@/hooks/UseCallAPIState';
import GroupService from '@/services/GroupService';

import cn from '@/utils/class-names';
import { useCallback, useEffect } from 'react';

interface RolesGridProps {
  className?: string;
  gridClassName?: string;
}
import { Group } from "@/types/Group";
import Rendering from '@/components/ConditionRender/RenderState';
export default function RolesGrid({
  className,
  gridClassName,
}: RolesGridProps) {
  const [allGroup, setAllGroup] = useCallAPIState<Group[]>({ status: "IDLE", data: [] })
  const fetchAllGroup = useCallback(
    async () => {
      setAllGroup("LOADING", []); // Corrected syntax
      try {
        const { data, statusCode } = await GroupService.getAllGroup();
       
        if (statusCode === 200) {
          setAllGroup("SUCCESS", data); // Corrected syntax
        } else {
          setAllGroup("ERROR", []); // Provide an empty array for error case
        }
      } catch (error) {
        console.error("Error fetching all groups:", error);
        setAllGroup("ERROR", []); // Handle error and set status to ERROR
      }
    },
    [setAllGroup]
  );

  useEffect(() => {
    fetchAllGroup()


  }, [setAllGroup]);

  return (
    <div className={cn('@container', className)}>
      <div
        className={cn(
          'grid grid-cols-1 gap-6 @[36.65rem]:grid-cols-2 @[56rem]:grid-cols-3 @[78.5rem]:grid-cols-4 @[100rem]:grid-cols-5',
          gridClassName
        )}
      >
        <Rendering loading={allGroup.loading}
          success={allGroup.success}
          error={allGroup.error}>

          {allGroup.data.map((role) => (
            <RoleCard key={role.name} {...role}  />
          ))}




        </Rendering>

      </div>
    </div>
  );
}
