<template>
  <q-page padding>
    <TheSignupForm />
    <TheLoginForm />
  </q-page>
</template>

<script setup lang="ts">
// import TheLoginForm from '~/components/TheLoginForm.vue';

import { useRepo } from 'pinia-orm';
import User from '~/models/User';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

onBeforeMount(() => {
  userStore
});


</script>