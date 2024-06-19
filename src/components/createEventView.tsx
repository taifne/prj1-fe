'use client';

import { useCallback, useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import {
    CreateEventInput,
    eventSchema
} from '@/utils/validators/create-user.schema';
import { Title } from '@/components/ui/text';
import Select from '@/components/ui/select';
import { useModal } from '@/components/Shared/modal-views/use-modal';
import {
    permissions,
    roles,
    statuses,
} from '@/components/Shared/roles-permissions/utils';
import useCallAPIState from '@/hooks/UseCallAPIState';
import GroupService from '@/services/GroupService';
import { title } from 'process';
import EventService from '@/services/EventService';
import { group } from 'console';
export default function CreateUser() {
    const { closeModal } = useModal();
    const [reset, setReset] = useState({});
    const [isLoading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<CreateEventInput> = async (data) => {
        // set timeout ony required to display loading state of the create category button
        const formattedData = {
            ...data,
            group : [data.group] as string[]
        };
   
       await EventService.createEvent(formattedData);
        setLoading(true);
        setTimeout(() => {
            console.log('formattedData', formattedData);
            setLoading(false);
            setReset({
                title: '',
                description: '',
                group: '',
                start: '',
                end: '',
            });
            closeModal();
        }, 600);
    };

    const [allGroup, setAllGroup] = useCallAPIState<Group[]>({ status: "IDLE", data: [] })
    const fetchAllGroup = useCallback(
        async () => {
            setAllGroup("LOADING", []); // Corrected syntax
            try {
                const { data, statusCode } = await GroupService.getAllGroup();
                console.log(data);
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
        <Form<CreateEventInput>
            resetValues={reset}
            onSubmit={onSubmit}
            validationSchema={eventSchema}
            className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
            {({ register, control, watch, formState: { errors } }) => {
                console.log('errors', errors);

                return (
                    <>
                        <div className="col-span-full flex items-center justify-between">
                            <Title as="h4" className="font-semibold">
                                Create a dailly event
                            </Title>
                            <ActionIcon size="sm" variant="text" onClick={closeModal}>
                                <PiXBold className="h-auto w-5" />
                            </ActionIcon>
                        </div>
                        <Input
                            label="Title"
                            placeholder="Enter user's full name"
                            {...register('title')}
                            className="col-span-full"
                            error={errors.title?.message}
                        />
                           <Input
                            label="Location"
                            placeholder="Enter user's full name"
                            {...register('location')}
                            className="col-span-full"
                            error={errors.location?.message}
                        />

                        <Input
                            label="Description"
                            placeholder="Enter user's Email Address"
                            className="col-span-full"
                            {...register('description')}
                            error={errors.description?.message}
                        />

                        <Controller
                            name="group"
                            control={control}
                            render={({ field: { name, onChange, value } }) => (
                                <Select
                                    options={allGroup.data.map(group => ({
                                        name: group.name,
                                        value: group._id
                                    }))}
                                    value={value}
                                    onChange={onChange}
                                    name={name}
                                    label="Group"
                                    className="col-span-full"
                                    error={errors?.group?.message}
                                    getOptionValue={(option) => option.value}
                                    displayValue={(selected: string) =>
                                        allGroup.data.map(group => ({
                                            name: group.name,
                                            value: group._id
                                        })).find((option) => option.value === selected)?.name ??
                                        selected
                                    }
                                />
                            )}
                        />

                        <Input
                            type="date"
                            label="Start day"
                            placeholder="Enter the events startday"
                            className="col-span-full"
                            {...register('start')}
                            error={errors.start?.message}
                        />

                        <Input
                            type="date"
                            label="Finissh date"
                            placeholder="Enter the event finissh day "
                            className="col-span-full"
                            {...register('end')}
                            error={errors.end?.message}
                        />


                        <div className="col-span-full flex items-center justify-end gap-4">
                            <Button
                                variant="outline"
                                onClick={closeModal}
                                className="w-full @xl:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="w-full @xl:w-auto dark:bg-gray-200 dark:text-white dark:active:enabled:bg-gray-300"
                            >
                                Create User
                            </Button>
                        </div>
                    </>
                );
            }}
        </Form>
    );
}
