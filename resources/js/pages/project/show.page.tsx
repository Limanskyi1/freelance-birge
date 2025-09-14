import { Language } from '@/entities/language';
import { Project } from '@/entities/project';
import { Skill } from '@/entities/skill';
import { UserCardHeader, UserRate } from '@/entities/user';
import { CancelProjectButton } from '@/features/project/cancel-project';
import { DisputeProjectButton } from '@/features/project/dispute-project';
import { BadgeList } from '@/shared/components/badge-list';
import { ExpandableText } from '@/shared/components/expandable-text';
import { useModal } from '@/shared/hooks/use-modal';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Text } from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';
import classNames from 'classnames';
import { ReactNode } from 'react';

const projectMock = {
    name: 'Python Create Tg...',
    terms: '14д 12ч 45м',
    price: 100,
    description:
        'Cделал топовое оформление для моего канала услуг, учел все мои пожелания, вытерпел все мои капризы, оперативно вносил правки. Однозначно рекомендую!...',
};

const userMock = {
    name: 'Andrew',
    rating: 0,
};

const languagesMock = [
    {
        id: 1007,
        name: 'Итальянский',
        code: 'it',
        created_at: '2025-07-21T15:01:46.000000Z',
        updated_at: '2025-07-21T15:01:46.000000Z',
        pivot: {
            profile_id: 1025,
            language_id: 1007,
        },
    },
];

const skillsMock = [
    {
        id: 1008,
        name: 'CSS',
        created_at: '2025-07-21T15:01:46.000000Z',
        updated_at: '2025-07-21T15:01:46.000000Z',
        pivot: {
            profile_id: 1025,
            skill_id: 1008,
        },
    },
    {
        id: 1005,
        name: 'C++',
        created_at: '2025-07-21T15:01:46.000000Z',
        updated_at: '2025-07-21T15:01:46.000000Z',
        pivot: {
            profile_id: 1025,
            skill_id: 1005,
        },
    },
];

type ProjectShowPageProps = SharedData & {
    project: Project;
};

const ProjectShowPage = (props: ProjectShowPageProps) => {
    const { project } = props;
    console.log(project);
    const cancelModal = useModal();
    const disputeModal = useModal();
    const bluredClass =
        cancelModal.isOpen || disputeModal.isOpen ? 'blur-[2px] pointer-events-none' : '';
    return (
        <section className="flex flex-1 flex-col bg-[#efeff4]">
            <div className="px-6 pt-25">
                <Card className={classNames('mb-4 gap-0 p-4', bluredClass)}>
                    <div className="mb-3 flex items-center justify-between">
                        <Text fontSize={15} fontColor="gray" className="font-medium">
                            Название
                        </Text>
                        <Text fontColor="black" className="font-medium">
                            {project.customer_job.name}
                        </Text>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                        <Text fontSize={15} fontColor="gray" className="font-medium">
                            Срок
                        </Text>
                        <Text fontColor="primary" className="font-medium">
                            {projectMock.terms}
                        </Text>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                        <Text fontSize={15} fontColor="gray" className="font-medium">
                            Цена
                        </Text>
                        <Text fontColor="black" className="font-medium">
                            {project.price}$
                        </Text>
                    </div>
                    <Text fontSize={15} fontColor="gray" className="mb-1 font-medium">
                        Описание
                    </Text>
                    <ExpandableText text={project.customer_job.description} />
                </Card>
                <div className={classNames('mb-4 grid grid-cols-2 gap-2', bluredClass)}>
                    <DisputeProjectButton
                        isOpenModal={disputeModal.isOpen}
                        openModal={disputeModal.open}
                        closeModal={disputeModal.close}
                        projectId={project.id}
                    />
                    <CancelProjectButton
                        isOpenModal={cancelModal.isOpen}
                        openModal={cancelModal.open}
                        closeModal={cancelModal.close}
                        projectId={project.id}
                    />
                </div>
                <Card className={classNames('gap-0 p-4', bluredClass)}>
                    <UserCardHeader
                        userName={userMock.name}
                        badges={null}
                        rightAddon={
                            <img
                                onClick={() => {}}
                                src="/icons/arrow-right.svg"
                                className="btn-press ml-auto"
                            />
                        }
                        className="mb-6"
                    />
                    <div className="mb-4 flex justify-between gap-2">
                        <BadgeList
                            leftIcon={<img src="/icons/language.svg" />}
                            items={languagesMock}
                            getItemLabel={(language: Language) => language.name}
                            className="flex-1"
                        />
                        <UserRate rating={userMock.rating} />
                    </div>
                    <Title className="mb-1 block font-medium">Навыки</Title>
                    <BadgeList items={skillsMock} getItemLabel={(skill: Skill) => skill.name} />
                </Card>
            </div>
            <div className={classNames('mt-auto bg-white px-6 pt-6 pb-12', bluredClass)}>
                <Button className="w-full">
                    <img src="/icons/chat.svg" />
                    Чат
                </Button>
            </div>
        </section>
    );
};

ProjectShowPage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default ProjectShowPage;
