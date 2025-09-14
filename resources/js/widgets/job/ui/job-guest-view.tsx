import { Job, JobSimilarCard } from '@/entities/job';
import { ReviewList } from '@/entities/review';
import { UserPreviewCard } from '@/entities/user';
import { ExpandableText } from '@/shared/components/expandable-text';
import { ROUTES } from '@/shared/config/routes';
import { usePageProps } from '@/shared/hooks/use-page-props';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';
import { getDayLabel } from '@/shared/utils/get-day-label';
import { router } from '@inertiajs/react';
import clsx from 'clsx';

interface JobGuestViewProps {
    job: Job;
}

export const JobGuestView = (props: JobGuestViewProps) => {
    const { job } = props;
    const { categories } = usePageProps();
    const getCategoryName = (categoryId: number) => {
        return categories.find((category) => category.id === categoryId)?.name;
    };
    return (
        <>
            <section className="flex-1 bg-[#efeff4] p-6 pt-25">
                <div className="mb-4">
                    {job.photo && (
                        <div className="relative">
                            <img
                                className="h-48 w-full rounded-tl-xl rounded-tr-xl object-cover"
                                src={job.photo}
                            />
                            <div className="absolute bottom-2 left-2 flex flex-col gap-1">
                                {Boolean(job.premium_mode) && <Badge variant="gray">Pro</Badge>}
                                {Boolean(job.express_mode) && (
                                    <Badge variant="gray">Экспресс-режим</Badge>
                                )}
                            </div>
                        </div>
                    )}
                    <div
                        className={clsx(
                            'flex items-center justify-between gap-1 bg-[#fff] px-4 py-3',
                            job.photo ? 'rounded-br-lg rounded-bl-lg' : 'rounded-lg',
                        )}
                    >
                        <h2 className="title-4 text-17 text-500">{job.name}</h2>
                        <span className="title-4 text-17 text-500 text-accent">{job.price}$</span>
                    </div>
                </div>
                <UserPreviewCard
                    user={job.author}
                    rightAddon={<img className="ml-auto" src="/icons/arrow-right.svg" />}
                    className="mb-4"
                />
                <div className="mb-4 border-input bg-white px-4 py-3">
                    <ExpandableText text={job.description} />
                    <div className="flex items-center justify-between">
                        <p className="text-15 text-500 text-gray">Срок</p>
                        <span className="text-17 text-accent">
                            {getDayLabel(Number(job.terms))}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-15 text-500 text-gray">Категории</p>
                        <span className="text-17 text-accent">
                            {getCategoryName(job.category_id)}
                        </span>
                    </div>
                </div>
                <ReviewList className="mb-3" />
                <Title className="mb-3 font-medium">Похожие</Title>
                <div className="scrollbar-hide flex flex-row gap-2 overflow-auto">
                    <JobSimilarCard
                        title="Draw furry discord or telegtam stickers pack"
                        price={35}
                        isPremium={true}
                        categoryLable={getCategoryName(job.category_id)}
                        className="min-w-[310px]"
                    />
                    <JobSimilarCard
                        title="Draw furry discord or telegtam stickers pack"
                        price={35}
                        isPremium={true}
                        categoryLable={getCategoryName(job.category_id)}
                        className="min-w-[310px]"
                    />
                    <JobSimilarCard
                        title="Draw furry discord or telegtam stickers pack"
                        price={35}
                        isPremium={true}
                        categoryLable={getCategoryName(job.category_id)}
                        className="min-w-[310px]"
                    />
                </div>
            </section>
            <div className="mt-auto grid grid-cols-2 gap-2 bg-white px-6 pt-6 pb-12">
                <Button>
                    <img src="/icons/chat.svg" />
                    Чат
                </Button>
                <Button onClick={() => router.get(ROUTES.projectCreate(job.id))}>
                    <img src="/icons/arrow-up.svg" />
                    Откликнуться
                </Button>
            </div>
        </>
    );
};
