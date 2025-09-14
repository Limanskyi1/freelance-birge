import { Card } from '@/shared/ui/card';
import { Dialog, DialogTrigger } from '@/shared/ui/dialog';
import { Text } from '@/shared/ui/text';
import { DisputeProjectModal } from './dispute-project-modal';

interface DisputeProjectButtonProps {
    isOpenModal: boolean;
    openModal: () => void;
    closeModal: () => void;
    projectId: number;
}

export const DisputeProjectButton = (props: DisputeProjectButtonProps) => {
    const { isOpenModal, openModal, closeModal, projectId } = props;
    return (
        <Dialog open={isOpenModal} modal={false}>
            <DialogTrigger onClick={openModal}>
                <Card className="flex flex-col items-center gap-1 p-2.5">
                    <img src="/icons/disput.svg" className="w-7" />
                    <Text fontColor="primary" className="font-medium">
                        Начать спор
                    </Text>
                </Card>
            </DialogTrigger>
            <DisputeProjectModal onClose={closeModal} projectId={projectId} />
        </Dialog>
    );
};
