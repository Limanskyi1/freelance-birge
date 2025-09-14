import { Job } from '@/entities/job';
import { OrderArchiveCard, OrderCard, OrderTab, useGetOrders } from '@/entities/order';
import { projectApi } from '@/entities/project';
import { withExpand } from '@/shared/components/hoc/with-expand';
import { ROUTES } from '@/shared/config/routes';
import { statusIcons } from '@/shared/consts';
import { Card } from '@/shared/ui/card';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const ExpandableOrderArchiveCard = withExpand(OrderArchiveCard);

export const OrdersCustomerPage = () => {
    const [projects, setProjects] = useState<Job[]>([]);
    const { data } = useGetOrders();

    useEffect(() => {
        projectApi.getProjects().then((data) => setProjects(data.projects));
    }, []);

    const [activeTab, setActiveTab] = useState<'orders' | 'service'>('orders');

    const handleClickTab = (name: 'orders' | 'service') => {
        setActiveTab(name);
    };

    const orders = (data?.orders ?? []) as Job[];
    const archive = (data?.archive ?? []) as Job[];

    return (
        <section className="flex-1 flex-col bg-[#efeff4] p-6 pt-25">
            <Card className="mb-4 grid grid-cols-2 gap-0 p-1">
                <OrderTab
                    onClick={() => handleClickTab('orders')}
                    isActive={activeTab === 'orders'}
                    title="Заказы"
                    count={0}
                />
                <OrderTab
                    onClick={() => handleClickTab('service')}
                    isActive={activeTab === 'service'}
                    title="Публикации"
                    count={orders.length}
                />
            </Card>
            <Link href="/orders/archive">
                <ExpandableOrderArchiveCard
                    count={archive.length}
                    isOpen={activeTab === 'service'}
                />
            </Link>
            {activeTab === 'orders' && (
                <div className="flex flex-col gap-2">
                    {projects.map((project) => (
                        <Link href={ROUTES.projectShow(project.id)} key={project.id}>
                            <OrderCard
                                icon={<img src={statusIcons[project.status]} className="w-7" />}
                                title={project.customer_job.name}
                                status={project.status}
                                terms={project.terms}
                                price={parseFloat(project.price)}
                                count={0}
                            />
                        </Link>
                    ))}
                </div>
            )}
            {activeTab === 'service' && (
                <div className="flex flex-col gap-2">
                    {orders.map((order) => (
                        <Link href={ROUTES.orderShow(order.id)} key={order.id}>
                            <OrderCard
                                icon={<img src={statusIcons[order.status]} className="w-7" />}
                                title={order.name}
                                status={order.status}
                                terms={order.terms}
                                price={parseFloat(order.price)}
                                count={0}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};
