<template>
  <q-card class="login-form">
    <q-card-section>
      <div class="text-center q-pt-lg">
        <div class="col text-h6 ellipsis">
          {{ t('login.title') }}
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md">
        <q-input v-model="username" filled :label="t('login.email')" lazy-rules />
        <q-input v-model="password" type="password" filled  :label="t('login.password')" lazy-rules />
        <div>
          <q-btn type="submit" :label="t('login.button')" color="primary" class="full-width" />
          <div class="text-center">
            <q-btn flat :label="t('login.forgotPassword')" color="secondary" class="full-width" />
          </div>
          <div class="row items-center">
            <div class="col">
            <q-separator />
          </div>
            <div class="col-12 col-md-auto mx-3">
              <p>{{ t("login.or") }}</p>
            </div>
            
            <div class="col">
            <q-separator />
          </div>
            </div>  
          <q-btn outline :label="t('login.signup')" color="secondary" class="full-width mt-3" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import globalEnv from "~/constants/globalEnv";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const form = ref({
  email: '',
  password: ''
})

const username = ref('')
const password = ref('')





</script>

<style scoped lang="scss">
.login-form {
  max-width: 400px;
  margin: auto;
}
</style>