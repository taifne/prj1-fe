import { cn } from "rizzui";
import { formatDate } from "@/utils/helpers/format-date";
import { useModal } from "@/hooks/useModal";
import { HeaderCell } from "./Table";

export const TicketDetail = (props: any) => {
  const { closeModal } = useModal();
  return (
    <div className=" w-full">
      <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7 ">
        <p className=" text-2xl mb-2">Ticket name: {props.data.ticket}</p>
        <p className="text-lg text-blue-600">
          Description: {props.data.ticket}
        </p>
        <p className="text-lg text-red-600">Comments:</p>
        <div className=" border-orange-300 border-2 p-3 ">
          {props.data.comments.length === 0 ? (
            <p>Don't have any comments</p>
          ) : (
            <div>
              {props.data.comments.map((item: any) => (
                <figure className="flex gap-5 mb-3">
                  <div className="flex w-10 h-10  center  bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium  text-center align-middle w-10 h-10 p-1.5 text-gray-600 dark:text-gray-300">
                      JL
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {item.username}{" "}
                      <span className=" font-normal italic">
                        {" "}
                        ({formatDate(item.createdAt, "YYYY-MM-DD 00:00")})
                      </span>
                    </p>
                    <p>{item.commentContent}</p>
                  </div>
                </figure>
              ))}
            </div>
          )}
        </div>
        <div className=" py-2 border-t">
          <button
            type="button"
            onClick={closeModal}
            className="px-3 py-1 float-right bg-gray-300 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getColumns = ({
  sortConfig,
  onHeaderCellClick,
  openModal,
}: Columns) => [
  {
    title: <div className="ps-2 h-50">#</div>,
    dataIndex: "seq",
    key: "seq",
    render: (_: any, __: any, count: any) => (
      <div className="inline-flex ps-2 text-white">{count + 1}</div>
    ),
  },
  {
    title: <HeaderCell title="Tenant" />,
    dataIndex: "tenant",
    key: "tenant",

    render: (tenant: string) => tenant.toLocaleUpperCase(),
  },
  {
    title: <HeaderCell title="Ticket" />,
    dataIndex: "ticket",
    key: "ticket",
    render: (_: string, row: any) => (
      <div
        className="hover:cursor-pointer text-white"
        onClick={() => {
          openModal({
            view: <TicketDetail data={row} />,
            customSize: "880px",
          });
        }}
      >
        {row.ticket}
      </div>
    ),
  },
  {
    title: <HeaderCell title="CreatedBy" />,
    dataIndex: "name",
    key: "name",

    render: (name: string) => name.toLowerCase(),
  },
  {
    title: (
      <HeaderCell
        title="CreatedAt"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "createdAt"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick?.("createdAt"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
      <HeaderCell
        title="ModifiedAt"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "updatedAt"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick?.("updatedAt"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Duration" />,
    dataIndex: "duration",
    key: "duration",
    render: (duration: number) => duration,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    render: (value: string) => value,
  },

  {
    title: <HeaderCell title="Servity" />,
    dataIndex: "servity",
    key: "servity",
    render: (servity: string) => (
      <div className=" font-semibold">
        {servity === "Low" ? (
          <p className=" text-green-500">Low</p>
        ) : servity === "Medium" ? (
          <p className=" text-yellow-400">Medium</p>
        ) : (
          <p className=" text-red-500">High</p>
        )}
      </div>
    ),
  },
  {
    title: <HeaderCell title="Comments" />,
    dataIndex: "comments",
    key: "comments",
    render: (_: any, row: any) => (
      <div className="inline-flex ps-2">{row.comments.length}</div>
    ),
  },
];

interface DateCellProps {
  date: Date;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
  timeFormat?: string;
  timeClassName?: string;
}

export function DateCell({
  date,
  className,
  timeClassName,
  dateClassName,
  dateFormat = "MMMM D, YYYY",
  timeFormat = "h:mm A",
}: DateCellProps) {
  return (
    <div className={cn(className, "grid gap-1")}>
      <time
        dateTime={formatDate(date, "YYYY-MM-DD")}
        className={cn("font-medium text-white", dateClassName)}
      >
        {formatDate(date, dateFormat)}
      </time>
      <time
        dateTime={formatDate(date, "HH:mm:ss")}
        className={cn("text-[13px] text-white", timeClassName)}
      >
        {formatDate(date, timeFormat)}
      </time>
    </div>
  );
}

type Columns = {
  data?: any[] | undefined;
  sortConfig?: any;
  handleSelectAll?: any;
  checkedItems?: string[];
  onHeaderCellClick?: (value: string) => void;
  onChecked?: (id: string) => void;
  openModal?: any;
};
