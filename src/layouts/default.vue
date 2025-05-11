<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          {{ t('app.title') }}
          <q-space />

        </q-toolbar-title>
        <a icon-btn :title="t('button.toggle_langs')" class="px-2" @click="toggleLocales()">
          <div size="8" i-carbon-language />
        </a>
        <a icon-btn :title="t('button.logout')" class="px-2" @click="userLogout()">
          <div size="8" i-carbon-logout />
        </a>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n';
import { useUserStore } from '~/stores/user';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();
const { logout } = useUserStore();
const router = useRouter();

import { availableLocales, loadLanguageAsync } from '~/modules/i18n'


async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}

const userLogout = () => {
  logout()
  console.log('logout')
  router.push('/home')
}


</script>