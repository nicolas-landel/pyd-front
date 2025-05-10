<template>
  <q-card class="signup-form">
    <q-card-section>
      <div class="text-center q-pt-lg">
        <div class="col text-h6 ellipsis">
          {{ t('signup.title') }}
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-form ref="signupForm" @submit.prevent="register" class="q-gutter-md">
        <q-input filled v-model="form.email" type="email" label="Email" required />
        <q-input filled v-model="form.firstName" type="text" :label="t('signup.firstName')" required />
        <q-input filled v-model="form.lastName" type="text" :label="t('signup.lastName')" required />
        <q-input filled v-model="form.password1" type="password" :label="t('password')" required />
        <q-input filled v-model="form.password2" type="password" :label="t('signup.confirmPassword')" required />
        <div>
          <q-btn type="submit" :label="t('signup.button')" color="primary" class="full-width" />
        </div>

      </q-form>
      <div class="row items-center mt-3">
        <div class="col">
          <q-separator />
        </div>
        <div class="col-12 col-md-auto mx-3">
          <p>{{ t("login.alreadyAccount") }}</p>
        </div>

        <div class="col">
          <q-separator />
        </div>
      </div>
      <q-btn outline :label="t('login.signup')" color="secondary" class="full-width mt-3" @click="goToLogin" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import axios from "axios";
import { useI18n } from "vue-i18n";
import type { QForm } from "quasar";
import { useQuasar } from 'quasar';
import globalEnv from "~/constants/globalEnv";
import { flattenResponseData } from "~/utils/utils.js";

const { t } = useI18n();
const $q = useQuasar()

const emit = defineEmits(['go-to-login'])


const signupForm = ref<QForm | null>(null);
const form = ref({
  email: "",
  firstName: "",
  lastName: "",
  password1: "",
  password2: "",
});


const goToLogin = () => {
  emit('go-to-login')
}

const isValidPassword = () => {
  return form.value.password1 === form.value.password2
}

const register = async () => {
  if (!signupForm.value) {
    console.error("Signup form reference is null.");
    $q.notify({
      message: t('errorOccurred'),
      color: 'negative'
    })
    return;
  }
  const isValid = await signupForm.value.validate();
  if (!isValid) {
    $q.notify({
      message: t('signup.formInvalid'),
      color: 'negative'
    })
    return;
  }
  if (!isValidPassword()) {
    $q.notify({
      message: t('signup.passwordMismatch'),
      type: 'negative'
    })
    return
  }
  try {
    const response = await axios.post(`${globalEnv.backUrl}/api/auth/registration/`, {
      email: form.value.email,
      first_name: form.value.firstName,
      last_name: form.value.lastName,
      password1: form.value.password1,
      password2: form.value.password2,
      username: form.value.email,
    });
    console.log("Registration successful:", response);
    $q.notify({
      type: 'positive',
      message: t('signup.successVerifyEmail'),
      caption: flattenResponseData(response?.data),
      color: 'positive'
    })
  } catch (error: any) {
    console.error("Registration failed:", error);
    $q.notify({
      type: 'negative',
      message: t('signup.error'),
      caption: flattenResponseData(error?.response?.data),
      color: 'negative'
    })
  }
};

</script>

<style scoped>
.signup-form {
  max-width: 400px;
  margin: auto;
}
</style>