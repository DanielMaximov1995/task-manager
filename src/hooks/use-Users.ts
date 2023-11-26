import create from 'zustand';
import { UserModelType} from '@/types/Schema';
import {getUsers} from "@/services/fetch";

type UsersStore = {
    users: UserModelType[];
    onCreateUsers : () => void;
    loading : boolean
};

export const useUsers = create<UsersStore>((set) => ({
    users: [], // Initial empty array
    loading : false,
    onCreateUsers: async () => {
        set({loading : true})
        const users = await getUsers();
        set({ users , loading : false});
    },
}));
