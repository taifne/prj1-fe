import { isEmpty } from "lodash";
import { useState } from "react";
import {
    PiMagnifyingGlassBold,
    PiFunnel,
    PiTextColumns,
    PiXBold,
} from "react-icons/pi";
import { useMedia } from "react-use";
import {
    Title,
    cn,
    Input,
    Button,
    Popover,
    CheckboxGroup,
    Checkbox,
    ActionIcon,
    Drawer,
} from "rizzui";

type ControlledTableProps = {
    isLoading?: boolean;
    showLoadingText?: boolean;
    filterElement?: React.ReactElement;
    filterOptions?: TableFilterProps;
    paginatorOptions?: TablePaginationProps;
    tableFooter?: React.ReactNode;
    className?: string;
    paginatorClassName?: string;
} & TableProps;

export function ControlledTable({
    isLoading,
    filterElement,
    filterOptions,
    paginatorOptions,
    tableFooter,
    showLoadingText,
    paginatorClassName,
    className,
    ...tableProps
}: ControlledTableProps) {
    if (isLoading) {
        return (
            <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-cente">
                {/* <Spinner size="xl" /> */}
                {showLoadingText ? (
                    <Title
                        as="h6"
                        className="-me-2 mt-4 font-medium text-gray-500"
                    >
                        Loading...
                    </Title>
                ) : null}
            </div>
        );
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks

    return (
        <>
            {!isEmpty(filterOptions) && (
                <TableFilter {...filterOptions}>{filterElement}</TableFilter>
            )}

            <div className="relative">
                <Table
                    scroll={{ x: 1000, y: 1000 }}
                    rowKey={(record) => record.id}
                    className={cn(className)}
                    {...tableProps}
                />

                {tableFooter ? tableFooter : null}
            </div>

            {!isEmpty(paginatorOptions) && (
                <TablePagination
                    paginatorClassName={paginatorClassName}
                    {...paginatorOptions}
                />
            )}
        </>
    );
}

export type TableFilterProps = {
    searchTerm: string;
    onSearchClear: () => void;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    columns: { [key: string]: any }[];
    checkedColumns: string[];
    setCheckedColumns: React.Dispatch<React.SetStateAction<string[]>>;
    hideIndex?: number;
    children?: React.ReactNode;
    drawerTitle?: string;
    hasSearched?: boolean;
    showSearchOnTheRight?: boolean;
    enableDrawerFilter?: boolean;
    menu?: React.ReactNode;
};

export function TableFilter({
    searchTerm,
    onSearchClear,
    onSearchChange,
    columns,
    checkedColumns,
    setCheckedColumns,
    hideIndex,
    drawerTitle = "Table Filters",
    hasSearched,
    enableDrawerFilter = false,
    showSearchOnTheRight = false,
    menu,
    children,
}: TableFilterProps) {
    const isMediumScreen = useMedia("(max-width: 1860px)", false);
    const [showFilters, setShowFilters] = useState(true);
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <div className="table-filter mb-4 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
                {!showSearchOnTheRight ? (
                    <Input
                        type="search"
                        placeholder="Search by anything..."
                        value={searchTerm}
                        onClear={onSearchClear}
                        onChange={onSearchChange}
                        inputClassName="h-9 text-white"
                        clearable={true}
                        prefix={<PiMagnifyingGlassBold className="h-4 w-4 " />}
                    />
                ) : null}

                {showSearchOnTheRight && enableDrawerFilter ? (
                    <>{menu ? menu : null}</>
                ) : null}

                {children && (
                    <>
                        {isMediumScreen || enableDrawerFilter ? (
                            <FilterDrawerView
                                isOpen={openDrawer}
                                setOpenDrawer={setOpenDrawer}
                                drawerTitle={drawerTitle}
                                hasSearched={hasSearched}
                            >
                                {children}
                            </FilterDrawerView>
                        ) : (
                            <>{showFilters ? children : null}</>
                        )}
                    </>
                )}
            </div>

            <div className="ms-4 flex flex-shrink-0 items-center">
                {showSearchOnTheRight ? (
                    <Input
                        type="search"
                        placeholder="Search by anything..."
                        value={searchTerm}
                        onClear={onSearchClear}
                        onChange={onSearchChange}
                        inputClassName="h-9"
                        clearable={true}
                        prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
                        className="me-2.5 text-white"
                    />
                ) : null}

                {children ? (
                    <Button
                        {...(isMediumScreen || enableDrawerFilter
                            ? {
                                  onClick: () => {
                                      setOpenDrawer(() => !openDrawer);
                                  },
                              }
                            : {
                                  onClick: () =>
                                      setShowFilters(() => !showFilters),
                              })}
                        variant={"outline"}
                        className={cn(
                            "me-2.5 h-9 pe-3 ps-2.5",
                            !(isMediumScreen || enableDrawerFilter) &&
                                showFilters &&
                                "border-dashed border-gray-700"
                        )}
                    >
                        <PiFunnel
                            className="me-1.5 h-[18px] w-[18px]"
                            strokeWidth={1.7}
                        />
                        {!(isMediumScreen || enableDrawerFilter) && showFilters
                            ? "Hide Filters"
                            : "Filters"}
                    </Button>
                ) : null}

                <ToggleColumns
                    columns={columns}
                    checkedColumns={checkedColumns}
                    setCheckedColumns={setCheckedColumns}
                    hideIndex={hideIndex}
                />
            </div>
        </div>
    );
}

type ToggleColumnsTypes<T> = {
    columns: T[];
    checkedColumns: string[];
    setCheckedColumns: React.Dispatch<React.SetStateAction<string[]>>;
    hideIndex?: number;
};

export function ToggleColumns<T>({
    columns,
    checkedColumns,
    setCheckedColumns,
    hideIndex,
}: ToggleColumnsTypes<T>) {
    return (
        <div className="">
            <Popover placement="bottom">
                <Popover.Trigger>
                    <ActionIcon variant="outline" title={"Toggle Columns"}>
                        <PiTextColumns
                            strokeWidth={3}
                            className=" h-6 w-6 text-white"
                        />
                    </ActionIcon>
                </Popover.Trigger>
                <Popover.Content className="z-50 min-w-[140px] px-2 bg-white [&>svg]:fill-white">
                    <div className="px-0.5 pt-2 text-left rtl:text-right">
                        <Title
                            as="h6"
                            className="mb-1 px-0.5 text-sm font-semibold"
                        >
                            Toggle Columns
                        </Title>
                        <CheckboxGroup
                            values={checkedColumns}
                            setValues={setCheckedColumns}
                            className="grid grid-cols-2 gap-x-6 gap-y-5 px-1.5 pb-3.5 pt-4"
                        >
                            {columns.map((column: any, index) => (
                                <Checkbox
                                    key={column.dataIndex}
                                    value={column.dataIndex}
                                    label={column.dataIndex}
                                    labelClassName="ml-2 rtl:mr-2 text-[13px] font-medium"
                                    className={cn(
                                        hideIndex && index === hideIndex
                                            ? "hidden"
                                            : ""
                                    )}
                                />
                            ))}
                        </CheckboxGroup>
                    </div>
                </Popover.Content>
            </Popover>
        </div>
    );
}

function FilterDrawerView({
    isOpen,
    drawerTitle,
    setOpenDrawer,
    children,
}: React.PropsWithChildren<{
    drawerTitle?: string;
    hasSearched?: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen?: boolean;
}>) {
    return (
        <Drawer
            size="sm"
            isOpen={isOpen ?? false}
            onClose={() => setOpenDrawer(false)}
            overlayClassName="dark:bg-opacity-20 backdrop-blur-md"
            containerClassName="dark:bg-gray-100"
        >
            <div className="flex h-full flex-col p-5">
                <div className="-mx-5 mb-6 flex items-center justify-between border-b border-gray-200 px-5 pb-4">
                    <Title as="h5">{drawerTitle}</Title>
                    <ActionIcon
                        size="sm"
                        rounded="full"
                        variant="text"
                        title={"Close Filter"}
                        onClick={() => setOpenDrawer(false)}
                    >
                        <PiXBold className="h-4 w-4" />
                    </ActionIcon>
                </div>
                <div className="flex-grow">
                    <div className="grid grid-cols-1 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full">
                        {children}
                    </div>
                </div>
                <Button
                    size="lg"
                    onClick={() => setOpenDrawer(false)}
                    className="mt-5 h-11 w-full text-sm"
                >
                    Show Results
                </Button>
            </div>
        </Drawer>
    );
}

import React from "react";
import Pagination, { PaginationProps } from "./Pagination";
import Table, { TableProps } from "../Table";

export type TablePaginationProps = {
    pageSize: number;
    setPageSize?: React.Dispatch<React.SetStateAction<number>>;
    paginatorClassName?: string;
} & PaginationProps;

export default function TablePagination({
    pageSize,
    setPageSize,
    total,
    paginatorClassName = "mt-5 xs:mt-6 sm:mt-7",
    ...props
}: TablePaginationProps) {
    if (total && total < pageSize) {
        return null;
    }

    return (
        <div
            className={cn(
                "table-pagination flex items-center justify-center sm:justify-between",
                paginatorClassName
            )}
        >
            {!setPageSize ? (
                total && (
                    <div className="hidden text-white sm:inline-flex">
                        {props.current} of {Math.ceil(total / pageSize)} pages
                    </div>
                )
            ) : (
                <div className="hidden items-center sm:flex">
                    Rows per page:{" "}
                    {/* <Select
            options={paginationLimitOptions}
            onChange={setPageSize}
            size="sm"
            variant="flat"
            value={pageSize}
            getOptionValue={({ value }) => value}
            suffix={<PiCaretDownBold />}
            useContainerWidth={false}
            dropdownClassName="p-1 border w-12 border-gray-100 shadow-lg"
            className="ms-1 [&_button]:font-medium"
          /> */}
                </div>
            )}
            <Pagination
                total={total}
                pageSize={pageSize}
                defaultCurrent={1}
                showLessItems={true}
                className="text-white "
                color="info"
                variant="solid"
                prevIconClassName="py-0 text-white !leading-[26px]"
                nextIconClassName="py-0 text-white !leading-[26px]"
                {...props}
            />
        </div>
    );
}
