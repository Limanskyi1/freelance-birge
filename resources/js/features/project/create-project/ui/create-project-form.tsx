import { Job } from '@/entities/job';
import { InputPicker } from '@/shared/components/input-picker/input-picker';
import { InputPickerTrigger } from '@/shared/components/input-picker/input-picker-trigger';
import { daySelections } from '@/shared/consts';
import { useActive } from '@/shared/hooks/use-active';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Text } from '@/shared/ui/text';
import { Textarea } from '@/shared/ui/textarea';
import { getDayLabel } from '@/shared/utils/get-day-label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { createProjectShema } from '../model/validation/create-project-shema';
import { CreateProjectRequest } from '../model/types/create-project-request';

interface CreateProjectFormProps extends ComponentProps<'form'> {
    order: Job;
}

export const CreateProjectForm = (props: CreateProjectFormProps) => {
    const { order } = props;
    const {
        auth: { user },
    } = usePageProps();
    const formState = useActive();

    const { mutate } = useMutation({
        mutationFn: async (data: CreateProjectRequest) => {
            const response = await axios.post('/project', data);
            return response;
        },
    });

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<z.infer<typeof createProjectShema>>({
        resolver: zodResolver(createProjectShema),
        mode: 'onChange',
        defaultValues: {
            price: Number(order.price),
            terms: String(order.terms),
            comment: '',
        },
    });

    const onSubmit = (data: z.infer<typeof createProjectShema>) => {
        const projectData = {
            price: Number(data.price),
            terms: Number(data.terms),
            comment: data.comment,
            author_id: order.author_id,
            customer_job_id: order.id,
            freelancer_id: user.id,
        };
        mutate(projectData);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            {...props}
            className={classNames('', props.className)}
        >
            <div className="mb-3 flex items-center justify-between">
                <Text fontColor="black" fontSize={20} className="font-semibold">
                    Детали
                </Text>
                <div onClick={formState.toggle} className="h-4">
                    {formState.isActive ? (
                        <img src="/icons/close.svg" />
                    ) : (
                        <Text fontColor="primary" className="font-semibold">
                            Изм.
                        </Text>
                    )}
                </div>
            </div>
            <Card
                className={classNames(
                    'mb-7.5 flex flex-col gap-3 p-4',
                    !formState.isActive && 'pointer-events-none opacity-50',
                )}
            >
                <div className="flex items-center justify-between">
                    <Label>Цена</Label>
                    <div className="input-bg flex max-w-[110px] items-center gap-2 overflow-hidden rounded-[10px] border px-4 py-2">
                        <span className="text-xs text-[#242424]">US$</span>
                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="max-w-[70%] text-[11px] focus:outline-none"
                                    type="number"
                                    value={String(field.value)}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label>Срок</Label>
                    <Controller
                        name="terms"
                        control={control}
                        render={({ field }) => (
                            <InputPicker
                                name="Срок"
                                value={field.value}
                                setValue={(val: string) => field.onChange(val)}
                                selections={daySelections}
                                pickedValue={{ days: 3 }}
                                renderTrigger={(val) => (
                                    <InputPickerTrigger name="Дни" value={val} />
                                )}
                                renderLabel={(option) => getDayLabel(option as number)}
                            />
                        )}
                    />
                </div>
            </Card>
            <Label htmlFor="comment" className="mb-3 block">
                Коментарий
            </Label>
            <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                    <Textarea
                        id="comment"
                        placeholder="Детальная информация о проекте..."
                        maxLength={1200}
                        className="h-38"
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            <Button disabled={!isValid} onClick={() => {}} className="mt-auto">
                {isValid && <img src="/icons/arrow-up.svg" />}
                Предложить
            </Button>
        </form>
    );
};
