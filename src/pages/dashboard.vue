<template>
  <q-page padding>
    Hello {{ getCurrentUser }}

  </q-page>



</template>


<script setup lang="ts">


import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { useUserStore } from '~/stores/user';
import { useRepo } from 'pinia-orm';

import User from '~/models/User';

const { t } = useI18n();
const $q = useQuasar();
const { getCurrentUser } = useUserStore();



</script>

<route lang="json">
  {
    "meta": {
      "requiresAuth": true,
      "middleware": [
        "auth"
      ]
    }
  }
</route>
