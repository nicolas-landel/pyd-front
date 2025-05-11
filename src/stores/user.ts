import { defineStore } from 'pinia'
import { User } from '~/models';
import { useRepo } from 'pinia-orm';

export const useUserStore = defineStore('user', () => {
    const userRepo = useRepo(User);

    const currentUser = ref<User | null>(null);

    const getCurrentUser = computed(() => currentUser.value);

    function setCurrentUser(user: any) {
      console.log('setCurrentUser', user);
      currentUser.value = user;
      console.log("?????", getCurrentUser.value);
    }

    function logout() {
      currentUser.value = null;
      userRepo.flush();
      localStorage.removeItem('token');
    }

    return {
      currentUser,
      getCurrentUser,
      setCurrentUser,
      logout
    };
  },
  {
    persist: true
  }
);



