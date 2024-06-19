import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { invoiceData } from '@/data/invoice-data';
import { productsData } from '@/data/products-data';
import { getColumns } from '@/components/Shared/invoice/invoice-list/columns';
import { getColumns as getOrderColumns } from '@/components/Shared/ecommerce/order/order-list/columns';
import { getColumns as getProductColumns } from '@/components/Shared/ecommerce/product/product-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Breadcrumb from '@/components/BreadCrum/AutoMapBreadCrum';
import useCallAPIState from '@/hooks/UseCallAPIState';
import UserService from '@/services/UserService';
import { User } from '@/types/User';
import UsersTable from '@/components/Shared/roles-permissions/users-table/create-news';
import Rendering from '@/components/ConditionRender/RenderState';
import ModalButton from '@/components/Shared/modal-button';
import CreateUser from '@/components/createView';
import { Event } from '@/types/eventinput';
import { News } from '@/data/users-data';
import StudyService from '@/services/StudyService';
export const metadata = {
  ...metaObject('Basic Table'),
};

const pageHeader = {
  title: 'Basic Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Basic',
    },
  ],
};

export default function BasicTablePage() {
  const location = useLocation();
  const [input,setInput]=useState<Partial<Event>>({})
  useEffect(() => {
    console.log(location.pathname)
  }, [])
  const [listStudy, setListStudy] = useCallAPIState<News[]>({ status: "IDLE", data: [] })
  const fetchGroups = useCallback(
    async () => {
      setListStudy("LOADING", [])
      const { statusCode, data } = await StudyService.getAllStudyPosts()

      if (statusCode === 200) {
        console.log(data);
        setListStudy("SUCCESS", data)
        return
      }
      setListStudy("ERROR", [])
    }, [setListStudy]
  )

  useEffect(() => {
    console.log(listStudy.data);
    fetchGroups()
  }, [fetchGroups])
  return (
    <>
      <Breadcrumb url={location.pathname} />
      <Rendering loading={listStudy.loading}
        success={listStudy.success}
        error={listStudy.error}>
         <div className="w-fit mt-10">
               <ModalButton 
            label="Create New SeBulletin"
            view={<CreateUser />}
            customSize="600px"
            className="mt-0"
          />
         </div>
         
            <UsersTable data={listStudy.data} />
      </Rendering>
    </>

  );
}
