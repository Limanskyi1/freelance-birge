import { api } from '@/shared/api';
import { useFilesUploader } from '@/shared/hooks/use-files-uploader';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Button } from '@/shared/ui/button';
import { DialogClose, DialogContent, DialogHeader } from '@/shared/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { Title } from '@/shared/ui/title';
import { Controller, useForm } from 'react-hook-form';

interface DisputeProjectModalProps {
    onClose: () => void;
    projectId: number;
}

export const disputeReasons = [
    'Работа не выполнена',
    'Нарушены сроки',
    'Нарушены условия',
    'Не выходит на связь',
    'Оплачен другой объём работ',
    'Другая причина',
];

interface DisputeFormValues {
    reason: string;
    description: string;
}

export const DisputeProjectModal = (props: DisputeProjectModalProps) => {
    const {
        auth: { user },
    } = usePageProps();
    const { onClose, projectId } = props;
    const filesUploader = useFilesUploader();
    const { handleSubmit, control, reset } = useForm<DisputeFormValues>({
        defaultValues: {
            reason: '',
            description: '',
        },
    });
    const onSubmit = async (data: DisputeFormValues) => {
        await api.post('/disput', {
            ...data,
            file_url: filesUploader.files[0] ?? null,
            project_id: projectId,
            user_id: user.id,
        });
        reset();
        onClose();
    };

    return (
        <DialogContent className="top-[unset] bottom-[12%] translate-y-[0%] p-3 [&>button:last-of-type]:hidden">
            <DialogHeader className="flex flex-row items-center justify-between">
                <Title fontSize={20} className="font-semibold">
                    Начать спор
                </Title>
                <DialogClose onClick={onClose}>
                    <img src="/icons/close.svg" className="w-7" />
                </DialogClose>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <Controller
                    name="reason"
                    control={control}
                    rules={{ required: 'Выберите категорию' }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger onClick={(e) => e.stopPropagation()}>
                                <SelectValue placeholder="Выбрать категорию" />
                            </SelectTrigger>
                            <SelectContent>
                                {disputeReasons.map((disputeReason, index) => (
                                    <SelectItem key={index} value={disputeReason}>
                                        {disputeReason}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    rules={{
                        required: 'Введите причину',
                        maxLength: { value: 200, message: 'Максимум 200 символов' },
                    }}
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            placeholder="Укажите причину спора"
                            className="h-38"
                            maxLength={200}
                        />
                    )}
                />
                <Title fontSize={20} className="font-semibold">
                    Фото и файлы
                </Title>
                <div className="flex flex-wrap gap-1">
                    {filesUploader.files.map((file) => {
                        const url = URL.createObjectURL(file);
                        return (
                            <div key={file.name} className="relative h-13 w-13">
                                <img
                                    src={url}
                                    alt={file.name}
                                    className="h-full w-full rounded-xl object-cover"
                                />
                                <img
                                    onClick={() => filesUploader.remove(file.name)}
                                    src="/icons/file-remove.svg"
                                    className="absolute top-0 right-0 h-4 w-4 cursor-pointer"
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                        <input
                            type="file"
                            multiple
                            className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
                            onChange={(e) => {
                                filesUploader.change(e);
                                e.target.value = '';
                            }}
                        />
                        <Button type="button" className="w-full">
                            <img src="/icons/file.svg" />
                            Добавить
                        </Button>
                    </div>
                    <Button type="submit">
                        <img src="/icons/arrow-up.svg" />
                        Отправить
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
};
