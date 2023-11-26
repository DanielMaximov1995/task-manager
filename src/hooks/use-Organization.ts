import create from 'zustand';
import { getOrganizationByEmail } from '@/services/fetch';
import { OrganizationModelType } from '@/types/Schema';

type OrganizationStore = {
    organizations: OrganizationModelType[];
    onCreate : () => void;
    loading : boolean
};

export const useOrganization = create<OrganizationStore>((set) => ({
    organizations: [], // Initial empty array
    loading : false,
    onCreate: async () => {
        set({loading : true})
        const organizations = await getOrganizationByEmail();
        set({ organizations , loading : false});
    },
}));
