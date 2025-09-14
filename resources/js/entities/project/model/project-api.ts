import { api } from '@/shared/api';

export const projectApi = {
    getProjects: async () => {
        try {
            const { data } = await api.get('/project');
            return data;
        } catch (error) {
            console.error(error);
        }
    },
};
