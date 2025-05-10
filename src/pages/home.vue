<template>
  <q-page padding>
    <div v-if="!getCurrentUser">
    
    <TheLoginForm v-if="showLoginForm" @login="saveUser" @go-to-signup="goToSignup" />
    <TheSignupForm v-else @go-to-login="goToLogin"/>
  </div>
  <div v-else>
    Welcome {{ getCurrentUser }}!
    </div>
  </q-page>
</template>

<script setup lang="ts">
// import TheLoginForm from '~/components/TheLoginForm.vue';

import { useRepo } from 'pinia-orm';
import User from '~/models/User';
import { useUserStore } from '~/stores/user';
import { useRouter } from 'vue-router';

const { getCurrentUser, setCurrentUser } = useUserStore();
const router = useRouter();

const showLoginForm = ref(true);

const goToSignup = () => {
  showLoginForm.value = false;
};

const goToLogin = () => {
  showLoginForm.value = true;
};

const saveUser = ({ user }: { user: User }) => {
  console.log('userLogged', user);
  setCurrentUser(user)
  console.log("GETTTT", getCurrentUser);
  router.push('/dashboard');
};


onBeforeMount(() => {
  console.log('BEFORE MOIOOOUNT', getCurrentUser);
  if (getCurrentUser) {
    router.push('/dashboard');
  }
});


</script>