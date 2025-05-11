import type { UserModule } from './types'

import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import { middlewareMap } from '~/router/middleware'

// import 'quasar/src/css/index.sass'
// import '@quasar/extras/material-icons/material-icons.css' // Or any other icon set you are using
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // Install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

    // Middleware processing
    ctx.router.beforeEach(async (to, from, next) => {
      const middlewares: string[] = (to.meta.middleware as string[]) || []

      for (const middlewareName of middlewares) {
        try {
          console.log('Middleware Name:', middlewareName)
          console.log('Middleware Map:', middlewareMap)

          // Use the middleware map to resolve the middleware
          const middleware = (await middlewareMap[middlewareName]()).default
          const result = await middleware(to, from)
          if (result) {
            return next(result) // Redirect if middleware returns a path
          }
        } catch (error) {
          console.error(`Failed to load middleware: ${middlewareName}`, error)
          return next(false) // Cancel navigation on error
        }
      }

      next() // Proceed to the route if no middleware returns a redirect
    })
  },
)
