import create from 'zustand';
import { getOrganizationByEmail } from '@/services/fetch';
import { OrganizationModelType } from '@/types/Schema';

type OrganizationStore = {
    organizations: OrganizationModelType[];
    onCreate : () => void;
    onUpdateOrganization: (slug: string, data : OrganizationModelType) => void;
    loading : boolean
};

export const useOrganization = create<OrganizationStore>((set) => ({
    organizations: [],
    loading : false,
    onCreate: async () => {
        set({loading : true})
        const organizations = await getOrganizationByEmail();
        set({ organizations , loading : false});
    },
    onUpdateOrganization : (slug , data) => {
        set({loading : true})
        set((state) => ({
            organizations: state.organizations.map((org) =>
                org.slug === slug
                    ? data
                    : org
            ),
            loading : false
        }))
    }
}));
