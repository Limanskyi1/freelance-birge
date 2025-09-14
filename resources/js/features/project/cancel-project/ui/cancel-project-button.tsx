import { Card } from '@/shared/ui/card';
import { Dialog, DialogTrigger } from '@/shared/ui/dialog';
import { Text } from '@/shared/ui/text';
import { CancelProjectModal } from './cancel-project-modal';

interface CancelProjectButtonProps {
    isOpenModal: boolean;
    openModal: () => void;
    closeModal: () => void;
    projectId: number;
}

export const CancelProjectButton = (props: CancelProjectButtonProps) => {
    const { isOpenModal, openModal, closeModal, projectId } = props;
    return (
        <Dialog open={isOpenModal} modal={false}>
            <DialogTrigger onClick={openModal}>
                <Card className="flex flex-col items-center gap-1 p-2.5">
                    <img src="/icons/close.svg" className="w-7" />
                    <Text fontColor="primary" className="font-medium">
                        Отменить заказ
                    </Text>
                </Card>
            </DialogTrigger>
            <CancelProjectModal onClose={closeModal} projectId={projectId} />
        </Dialog>
    );
};
