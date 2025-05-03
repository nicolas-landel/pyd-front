import { Quasar, Notify } from 'quasar'
import { type UserModule } from '~/types'
import 'quasar/dist/quasar.css'

export const install: UserModule = ({ app }) => {
  app.use(Quasar, {
    plugins: {
      Notify
    },
    extras: [
      'material-icons'
    ],
  })
}