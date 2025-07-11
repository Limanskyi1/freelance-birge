import { isCustomerJobCreateFormFilled } from '@/features/customer/job/create-job';
import { CreateCustomerJobFormValues } from '@/features/customer/job/create-job/model/types';
import { useCustomerJobForm } from '@/features/customer/job/model/use-customer-job-form';
import { DayPicker } from '@/shared/components/day-picker';
import { useFile } from '@/shared/hooks/use-file';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Textarea } from '@/shared/ui/textarea';
import { Category, SharedData } from '@/types';
import { router } from '@inertiajs/react';

const selections = {
    days: Array.from({ length: 90 }, (_, i) => i + 1),
};

type CustomerJobCreateProps = SharedData & {
    categories: Category[];
};

const CustomerJobCreate = (props: CustomerJobCreateProps) => {
    const {
        categories,
        auth: { user },
    } = props;
    const photoFile = useFile();

    const {
        formData,
        setFormData,
        handleChangeCategoryId,
        handleChangeTerms,
        handleChangeField,
        toggleMode,
    } = useCustomerJobForm<CreateCustomerJobFormValues>({
        name: '',
        description: '',
        photo: null,
        price: '0',
        terms: null,
        is_active: false,
        express_mode: false,
        premium_mode: false,
        category_id: null,
        sub_category_id: null,
    });

    const handleClickAddPhoto = () => photoFile.ref.current?.click();

    const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        photoFile.onChange(e, (file) => {
            setFormData((prev) => ({ ...prev, photo: file }));
        });
    };

    const handleSave = () => {
        router.post('/customer-job', {
            ...formData,
            user_id: user.id,
        });
    };

    const isFilledForm = isCustomerJobCreateFormFilled(formData);
    const subCategories =
        categories.find(({ id }) => id === formData.category_id)?.sub_categories || [];

    return (
        <div className="flex min-h-[100vh] flex-col gap-3 bg-[#efeff4] p-6 pb-12">
            <div className="flex flex-col items-center gap-2">
                <div
                    className="flex h-48 w-full items-center justify-center overflow-hidden rounded-sm border bg-[#fff]"
                    style={{
                        backgroundImage: photoFile.preview ? `url(${photoFile.preview})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {photoFile.preview ? null : <p className="font-semibold">Ваше фото</p>}
                </div>
                <Button className="w-full" onClick={handleClickAddPhoto}>
                    Добавить
                </Button>
                <input
                    type="file"
                    accept="image/*"
                    ref={photoFile.ref}
                    onChange={handlePhotoFileChange}
                    className="hidden"
                />
            </div>
            <Select onValueChange={(value) => handleChangeCategoryId('category_id', Number(value))}>
                <SelectTrigger>
                    <SelectValue placeholder="Выбрать категорию" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem
                            key={category.id}
                            value={String(category.id)}
                            onSelect={() => console.log(category)}
                        >
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select
                onValueChange={(value) => handleChangeCategoryId('sub_category_id', Number(value))}
                disabled={!formData.category_id}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Выбрать подкатегорию (опционально)" />
                </SelectTrigger>
                <SelectContent>
                    {subCategories.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Название</Label>
                <Textarea
                    id="title"
                    name="name"
                    value={formData.name}
                    onChange={handleChangeField}
                    placeholder="Кратко опишите суть проекта"
                    className="h-26"
                    maxLength={40}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Описание</Label>
                <Textarea
                    id="title"
                    name="description"
                    value={formData.description}
                    onChange={handleChangeField}
                    placeholder="Опишите детали, сроки, требования, ожидаемый результат и тд."
                    maxLength={120}
                    className="h-34"
                />
            </div>
            <Label>Стоимость и сроки</Label>
            <Card className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="title">Бюджет</Label>
                    <div className="input-bg flex max-w-[110px] items-center gap-2 overflow-hidden rounded-[10px] border px-4 py-2.5">
                        <span className="text-xs text-[#242424]">US$</span>
                        <input
                            className="max-w-[70%] focus:outline-none"
                            name="price"
                            onChange={handleChangeField}
                            type="text"
                            value={formData.price}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="title">Срок</Label>
                    <DayPicker
                        value={formData.terms}
                        setValue={handleChangeTerms}
                        selections={selections}
                        pickedValue={{ days: 3 }}
                    />
                </div>
            </Card>
            <div>
                <div className="mb-3 flex items-center">
                    <h4 className="title-4 mr-0.5">Premium Функции</h4>
                    <img src="/icons/star.svg" />
                </div>
                <div className="card mb-1 flex items-center justify-between rounded-[10px] px-4 py-3">
                    <h4 className="title-4 mr-0.5">Экспресс-режим</h4>
                    <Switch
                        name="express_mode"
                        checked={formData.express_mode}
                        onClick={() => toggleMode('express_mode')}
                    />
                </div>
                <p className="text-description max-w-[269px]">
                    Быстрый поиск фрилансера: заказ поднимается в топ списка с{' '}
                    <a href="">RIKI Premium</a>
                </p>
            </div>
            <div className="mb-7">
                <div className="card mb-1 flex items-center justify-between rounded-[10px] px-4 py-3">
                    <h4 className="title-4 mr-0.5">Только для Premium</h4>
                    <Switch
                        name="premium_mode"
                        checked={formData.premium_mode}
                        onClick={() => toggleMode('premium_mode')}
                    />
                </div>
                <p className="text-description max-w-[269px]">
                    Фильтруются лучшие фрилансеры для сложных и высокобюджетных заказов с{' '}
                    <a href="">RIKI Premium</a>
                </p>
            </div>
            <Button disabled={!isFilledForm} onClick={handleSave}>
                Продолжить
            </Button>
        </div>
    );
};

export default CustomerJobCreate;
