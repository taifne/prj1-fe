'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import {
    CreateNewInput,
    createNewsSchema,
} from '@/utils/validators/create-user.schema';
import { Title } from '@/components/ui/text';
import Select from '@/components/ui/select';
import { useModal } from '@/components/Shared/modal-views/use-modal';
import {
    permissions,
    roles,
    statuses,
} from '@/components/Shared/roles-permissions/utils';
import StudyService from '@/services/StudyService';
import { title } from 'process';
export default function CreateUser() {
    const { closeModal } = useModal();
    const [reset, setReset] = useState({});
    const [isLoading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<CreateNewInput> = async(data) => {
        // set timeout ony required to display loading state of the create category button
        const formattedData = {
            ...data,
            link: "",
            image:""
        };
        setLoading(true);   
        await StudyService.createNewSeNew(formattedData)
        setTimeout(() => {
            console.log('formattedData', formattedData);
         
            setLoading(false);
            setReset({
                title: '',
                description: '',
                startDay: '',
                endDay: ''
            });
            closeModal();
        }, 600);
    };

    return (
        <Form<CreateNewInput>
            resetValues={reset}
            onSubmit={onSubmit}
            validationSchema={createNewsSchema}
            className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
            {({ register, control, watch, formState: { errors } }) => {
                console.log('errors', errors);

                return (
                    <>
                        <div className="col-span-full flex items-center justify-between">
                            <Title as="h4" className="font-semibold">
                                Create a new Se Bulletint
                            </Title>
                            <ActionIcon size="sm" variant="text" onClick={closeModal}>
                                <PiXBold className="h-auto w-5" />
                            </ActionIcon>
                        </div>
                        <Input
                            label="Full Name"
                            placeholder="Enter the new title"
                            {...register('title')}
                            className="col-span-full"
                            error={errors.title?.message}
                        />

                        <Input
                            label="Description"
                            placeholder="Enter the event's description"
                            className="col-span-full"
                            {...register('description')}
                            error={errors.description?.message}
                        />

                        <Input
                            type="date"
                            label="Email"
                            placeholder="Enter the events startday"
                            className="col-span-full"
                            {...register('startDay')}
                            error={errors.startDay?.message}
                        />

                        <Input
                            type="date"
                            label="Start date"
                            placeholder="Enter the event finissh day "
                            className="col-span-full"
                            {...register('endDay')}
                            error={errors.endDay?.message}
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
