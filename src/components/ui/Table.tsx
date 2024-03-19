import { Empty } from "rizzui";
import RcTable from "rc-table";
import cn from "@/utils/helpers/class-names";

export type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T;

const classes = {
  table:
    "[&_.rc-table-content]:overflow-x-auto [&_table]:w-full [&_.rc-table-row:hover]:bg-gray-600 [&_.rc-table-row-expand-icon-cell]:w-14",
  thead:
    "[&_thead]:text-left [&_thead]:rtl:text-right [&_th.rc-table-cell]:uppercase   [&_th.rc-table-cell]:text-xs [&_th.rc-table-cell]:font-semibold [&_th.rc-table-cell]:tracking-wider [&_th.rc-table-cell]:text-white",
  tCell:
    "[&_.rc-table-cell]:px-2 [&_th.rc-table-cell]:py-3 [&_td.rc-table-cell]:py-2 [&_th.rc-table-cell]:border ",
  variants: {
    classic:
      "[&_thead]:bg-gray-300 [&_.rc-table-container]:border-x [&_.rc-table-container]:border-gray-200/70 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-gray-200/70 [&_thead]:border-y [&_thead]:border-gray-200/70",
    modern:
      "[&_thead_th]:bg-[#312e81] [&_thead_th]:text-white [&_td.rc-table-cell]:border   [&_td.rc-table-cell]:border-gray-200/70 [&_thead_.rc-table-row-expand-icon-cell]:bg-gray-100",
    minimal:
      "[&_thead_th]:bg-gray-100 [&_thead_th:first-child]:rounded-ss-lg [&_thead_th:first-child]:rounded-es-lg [&_thead_th:last-child]:rounded-se-lg [&_thead_th:last-child]:rounded-ee-lg [&_thead_.rc-table-row-expand-icon-cell]:bg-gray-100",
    elegant:
      "[&_thead]:border-y [&_thead]:border-gray-200/70 [&_td.rc-table-cell]:border-b [&_td.rc-table-cell]:border-gray-200/70",
    retro:
      "[&_thead]:border-y [&_thead]:border-gray-200/70 [&_tbody_tr:last-child_td.rc-table-cell]:border-b [&_tbody_tr:last-child_td.rc-table-cell]:border-gray-200/70",
  },
  striped:
    "[&_.rc-table-row:nth-child(2n)_.rc-table-cell]:bg-gray-100/50 [&_.rc-table-row:hover]:bg-transparent",
};

type RCTableProps = ExtractProps<typeof RcTable>;

export interface TableProps
  extends Omit<RCTableProps, "className" | "emptyText"> {
  /** Set empty text, it will only appear when table has no data */
  emptyText?: React.ReactElement;
  /** The variants of the component are: */
  variant?: keyof typeof classes.variants;
  /** Add striping style */
  striped?: boolean;
  /** Add custom classes for extra style */
  className?: string;
}

/**
 *  React table component with useful functions. Under the hood we are using `rc-table` package,
 * you can check their official documentation for more details -> https://www.npmjs.com/package/rc-table
 */
export default function Table({
  striped,
  variant = "classic",
  emptyText,
  className,
  ...props
}: TableProps) {
  return (
    <RcTable
      className={cn(
        classes.table,
        classes.thead,
        classes.tCell,
        classes.variants[variant],
        striped && classes.striped,
        className
      )}
      emptyText={
        emptyText || (
          <div className="py-5 text-center lg:py-8">
            <Empty /> <p className="mt-3">No Data</p>
          </div>
        )
      }
      {...props}
    />
  );
}

// Table Header Cell Component
type TextAlign = "left" | "center" | "right";

export interface HeaderCellProps {
  title: React.ReactNode;
  width?: number;
  /** Set table header cell text alignment */
  align?: TextAlign;
  /** Make header cell text ellipsis, you need to set width prop too */
  ellipsis?: boolean;
  /** Make sortable column, it's also required ascending prop too. Check our example for more details. */
  sortable?: boolean;
  /** Make ascending column, it's also required sortable prop too. Check our example for more details. */
  ascending?: boolean;
  /** Add custom classes to the sort icon for extra style */
  iconClassName?: string;
  /** Add custom classes for extra style */
  className?: string;
}

// A util func
function handleTextAlignment(align: TextAlign) {
  if (align === "center") return "justify-center";
  if (align === "right") return "justify-end";
  return "";
}

export function HeaderCell({
  title,
  align = "left",
  width,
  ellipsis,
  sortable,
  ascending,
  iconClassName,
  className,
}: HeaderCellProps) {
  if (ellipsis && width === undefined) {
    console.warn(
      "When ellipsis is true make sure you are using the same column width in HeaderCell component too."
    );
  }
  if (width !== undefined && ellipsis !== true) {
    console.warn(
      "width prop without ellipsis won't work, please set ellipsis prop true."
    );
  }
  return (
    <div
      className={cn(
        "flex items-center gap-1",
        sortable && "cursor-pointer",
        handleTextAlignment(align),
        className
      )}
    >
      <div
        {...(ellipsis && { className: "truncate" })}
        {...(ellipsis && width && { style: { width } })}
      >
        {title}
      </div>
      {sortable && (
        <div className="inline-flex">
          {ascending ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className={cn("h-auto w-3", iconClassName)}
              viewBox="0 0 16 16"
            >
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className={cn("h-auto w-3", iconClassName)}
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}
