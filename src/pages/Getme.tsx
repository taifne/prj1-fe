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
import { useCallback, useEffect } from 'react';
import { MdOutlineVerifiedUser } from "react-icons/md";
import Breadcrumb from '@/components/BreadCrum/AutoMapBreadCrum';
import useCallAPIState from '@/hooks/UseCallAPIState';
import { MdOutlineEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import UserService from '@/services/UserService';
import { User } from '@/types/User';
import UsersTable from '@/components/Shared/roles-permissions/users-table';
import Rendering from '@/components/ConditionRender/RenderState';
import AuthService from '@/services/AuthService';
import RoleCard from '@/components/Shared/roles-permissions/role-card';
import { ActionIcon, Avatar, Badge, Dropdown, DropdownItem, Title } from 'rizzui';
import ModalButton from '@/components/Shared/modal-button';
import CreateUser from '@/components/Shared/roles-permissions/create-user';
import EditRole from '@/components/Shared/roles-permissions/edit-role';
import UserCog from '@/components/icons/user-cog';
import { VscTypeHierarchySub } from "react-icons/vsc";
import { users } from '@/data/roles-permissions';
import { PiDotsThreeBold } from 'react-icons/pi';
import { GrStatusUnknown } from "react-icons/gr";
import { GoUnverified } from "react-icons/go";
import { MdNotificationsActive } from "react-icons/md";
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
    useEffect(() => {
        console.log(location.pathname)
    }, [])
    const [listStudy, setListStudy] = useCallAPIState<Partial<GetMe>>({
        status: "IDLE", data: {

        }
    })
    const fetchGroups = useCallback(
        async () => {
            setListStudy("LOADING", {})
            const { statusCode, data } = await AuthService.GetMe()

            if (statusCode === 200) {
                console.log(data);
                setListStudy("SUCCESS", data)
                return
            }
            setListStudy("ERROR", {})
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

                <div className="user-profile w-5/6 mx-auto bg-white p-3 py-5 border-2 rounded-lg shadow-md">
                    <div className="w-full flex h-72   ">
                        <div className="w-2/3 flex">
                            <div className="w-1/5 h-full flex justify-center items-center m-2">
                                <img src={listStudy.data.avatar} alt={listStudy.data.fullName} className="avatar w-32 h-32 rounded-full mx-auto mb-4" />
                            </div>
                            <div className="w-3/5  flex flex-col h-full justify-center items-center">
                                <div className="w-full h-1/2 flex flex-col items-start p-2">
                                    <p className='m-2 text-2xl font-bold text-gray-600'>{listStudy.data.fullName}</p>
                                    <div className="w-full flex justify-start items-center">
                                        <MdOutlineEmail className='text-xl m-2' />
                                        <p className='m-2'>{listStudy.data.email}</p>
                                    </div>
                                </div>
                                <div className="w-full flex h-1/2">

                                    <div className="w-1/3 flex flex-col">
                                        <div className="w-full m-2">
                                            Role
                                        </div>
                                        <div className="flex w-full">
                                            <GrStatusUnknown className='text-xl m-2' />
                                            <p className="text-center text-gray-600 m-2">
                                                {listStudy.data.role}</p>
                                        </div>

                                    </div>
                                    <div className="w-1/3 flex flex-col">
                                        <div className="w-full m-2">
                                            Verify
                                        </div>
                                        <div className="flex w-full">

                                            <p className="text-center text-gray-600 mb-4 flex items-center">
                                                {listStudy.data.isVerified ?
                                                    (<><MdOutlineVerifiedUser className='text-xl m-2' />
                                                        <p className='p-2'>Verified</p>
                                                    </>
                                                    )
                                                    : (<>
                                                        <GoUnverified className='text-xl' />
                                                        <p className='p-2'>Not Verified</p>
                                                    </>)
                                                }</p>
                                        </div></div>
                                    <div className="w-1/3">
                                        <div className="w-full m-2">
                                            Status
                                        </div>
                                        <div className="flex w-full">

                                            <p className="text-center text-gray-600 mb-4 flex items-center">

                                                <MdNotificationsActive className='text-xl m-2' />
                                                <p className='m-2'>{listStudy.data.status}</p>


                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>







                        </div>
                        <div className="w-1/3 overflow-hidden">
                            <h2 className="text-xl font-semibold mb-2">Groups</h2>
                            {listStudy.data.group?.map((role) => (
                                <div className='rounded-lg border border-gray-200 p-6 w-48'>
                                    <header className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="grid h-10 w-10 place-content-center rounded-lg text-white"
                                                style={{
                                                    backgroundColor: role.color,
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M7 6.5H16.75C18.8567 6.5 19.91 6.5 20.6667 7.00559C20.9943 7.22447 21.2755 7.50572 21.4944 7.83329C21.935 8.49268 21.9916 8.96506 21.9989 10.5M12 6.5L11.3666 5.23313C10.8418 4.18358 10.3622 3.12712 9.19926 2.69101C8.6899 2.5 8.10802 2.5 6.94427 2.5C5.1278 2.5 4.21956 2.5 3.53806 2.88032C3.05227 3.15142 2.65142 3.55227 2.38032 4.03806C2 4.71956 2 5.6278 2 7.44427V10.5C2 15.214 2 17.5711 3.46447 19.0355C4.8215 20.3926 6.44493 20.4927 10.5 20.5H11"
                                                        stroke="currentColor"
                                                        strokeWidth="1.3"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M15.59 18.9736C14.9612 19.3001 13.3126 19.9668 14.3167 20.801C14.8072 21.2085 15.3536 21.4999 16.0404 21.4999H19.9596C20.6464 21.4999 21.1928 21.2085 21.6833 20.801C22.6874 19.9668 21.0388 19.3001 20.41 18.9736C18.9355 18.208 17.0645 18.208 15.59 18.9736Z"
                                                        stroke="currentColor"
                                                        strokeWidth="1.3"
                                                    />
                                                    <path
                                                        d="M20 14.4378C20 15.508 19.1046 16.3756 18 16.3756C16.8954 16.3756 16 15.508 16 14.4378C16 13.3676 16.8954 12.5 18 12.5C19.1046 12.5 20 13.3676 20 14.4378Z"
                                                        stroke="currentColor"
                                                        strokeWidth="1.3"
                                                    />
                                                </svg>
                                            </span>
                                            <Title as="h4" className="font-medium">
                                                {role.name}
                                            </Title>
                                        </div>
                                        <button className="ml-auto h-7 w-7 rounded px-0.5 transition duration-300 hover:bg-gray-100">
                                            <PiDotsThreeBold size={26} />
                                        </button>

                                    </header>
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="flex items-center">
                                            {role.users?.map((user) => (
                                                <figure
                                                    key={user._id}
                                                    className="relative z-10 -ml-1.5 h-8 w-8 rounded-full border-2 border-white"
                                                >
                                                    <Avatar
                                                        name="Jane Doe"
                                                        src={user.avatar}
                                                    />
                                                </figure>
                                            ))}
                                        </div>
                                        <span>Total {users.length} users</span>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="w-full flex border-t-2 pt-5">
                        <div className="w-1/2 flex flex-col items-center">
                            <div className="w-full">

                                <h2 className="text-xl font-semibold mb-2">Permissions</h2>
                                <ul className="list-disc list-inside mb-4 space-x-2 space-y-2 ml-16">
                                    {listStudy.data.permissions?.map(permission => (
                                        <Badge
                                            key={permission}
                                            rounded="lg"
                                            variant="outline"
                                            className="border-gray-200 mx-4 my-2 h-1/4 text-md font-bold uppercase text-gray-500 w-1/4 hover:bg-black hover:text-white hover:scale-105"
                                        >
                                            {permission}
                                        </Badge>
                                    ))}
                                </ul>
                            </div>

                        </div>
                        <div className="w-1/2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Logo_UIT_updated.svg/1200px-Logo_UIT_updated.svg.png" alt={listStudy.data.fullName} className="avatar w-44 h-44 rounded-full mx-auto mb-4" />
                        </div>

                    </div>



                </div>







            </Rendering>



        </>

    );
}
