import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/common/router'
import { client } from './common/services/supabase.service'
import { userSession } from '@/auth/auth.service'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

/**
 * Keeps track of if the user is logged in or out and will update userSession state accordingly.
 */
client.auth.onAuthStateChange((event, session) => {
    userSession.value = session
})