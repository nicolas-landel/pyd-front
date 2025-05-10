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
      <q-form class="q-gutter-md" @submit.prevent="login">
        <q-input v-model="username" filled type="email" :label="t('login.email')" lazy-rules required />
        <q-input v-model="password" type="password" filled :label="t('login.password')" lazy-rules required />
        <div>
          <q-btn type="submit" :label="t('login.button')" color="primary" class="full-width" />
          <div class="text-center">
            <q-btn flat :label="t('login.forgotPassword')" color="secondary" class="full-width" />
          </div>
          <div class="row items-center mt-2">
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
          <q-btn outline :label="t('login.signup')" color="secondary" class="full-width mt-3" @click="goToSignup" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import globalEnv from "~/constants/globalEnv";
import { useI18n } from "vue-i18n";
import axios from "axios";
import User from "~/models/User";
import { useRepo } from "pinia-orm";
import { useQuasar } from 'quasar';
import { flattenResponseData } from "~/utils/utils.js";
import { useUserStore } from "~/stores/user";


const { t } = useI18n()
const userRepo = useRepo(User)
const $q = useQuasar()
const { setCurrentUser } = useUserStore()

const emit = defineEmits(['login', 'go-to-signup'])

const form = ref({
  email: '',
  password: ''
})

const username = ref('')
const password = ref('')

const goToSignup = () => {
  emit('go-to-signup')
}


const login = async () => {
  try {
    const response = await axios.post(`${globalEnv.backUrl}/api/auth/login`, {
      email: username.value,
      password: password.value,
      username: username.value,
    })
    console.log('Login successful:', response)
    const user = await getUserData(response.data.key)
    localStorage.setItem('token', response.data.key)
    emit('login', { user })


  } catch (error: any) {
    console.error('Login failed:', error)
    $q.notify({
      color: 'negative',
      message: t('login.error'),
      caption: flattenResponseData(error?.response?.data),
      position: 'top',
      timeout: 5000,
    })
  }
}

const getUserData = async (token: string) => {
  const response = await axios.get(`${globalEnv.backUrl}/api/users/user-data/${username.value}`, {
    headers: {
      Authorization: `Token ${token}`,
    }
  },)
  return userRepo.save({ ...response.data, token, isCurrentUser: true })
}


</script>

<style scoped lang="scss">
.login-form {
  max-width: 400px;
  margin: auto;
}
</style>