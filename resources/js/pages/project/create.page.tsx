import { Job } from '@/entities/job';
import { CreateProjectForm } from '@/features/project/create-project';
import { LayoutWithNavbar } from '@/shared/layouts/layout-with-navbar';
import { Title } from '@/shared/ui/title';
import { SharedData } from '@/types';
import { ReactNode } from 'react';

type ProjectCreatePageProps = SharedData & {
    order: Job;
};

const ProjectCreatePage = (props: ProjectCreatePageProps) => {
    const { order } = props;
    return (
        <section className="flex flex-1 flex-col bg-[#efeff4] px-6 pt-22 pb-12">
            <Title fontSize={24} className="mb-7.5 text-center font-semibold">
                Предложить свою кандидатуру
            </Title>
            <CreateProjectForm order={order} className="flex flex-1 flex-col" />
        </section>
    );
};

ProjectCreatePage.layout = (page: ReactNode) => <LayoutWithNavbar>{page}</LayoutWithNavbar>;

export default ProjectCreatePage;
