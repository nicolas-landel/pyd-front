import type { UserModule } from '~/types'
import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const pinia = createPinia().use(createORM()).use(piniaPluginPersistedstate)
  app.use(pinia)
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient)
    pinia.state.value = (initialState.pinia) || {}

  else
    initialState.pinia = pinia.state.value
}
