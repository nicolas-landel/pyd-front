import { defineStore } from 'pinia'
import { User } from '~/models';

export const useUserStore = defineStore('user', () => {
    const currentUser = ref<User | null>(null);

    const getCurrentUser = computed(() => currentUser.value);

    function setCurrentUser(user: any) {
      console.log('setCurrentUser', user);
      currentUser.value = user;
      console.log("?????", getCurrentUser.value);
    }

    return {
      currentUser,
      getCurrentUser,
      setCurrentUser,
    };
  },
  {
    persist: true
  }
);



