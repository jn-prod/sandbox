<script lang="tsx">
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { client } from './common/services/supabase.service';
import type { Session } from '@supabase/gotrue-js';

interface IAppData {
  session: undefined | null | Session
}

export default defineComponent({
  data(): IAppData {
    return {
      session: undefined
    }
  },
  mounted() {
    client.auth.onAuthStateChange((_, session) => {
      console.log(_, session)
      this.session = session
    })
  },
  render() {
    return ([
      <header class="header">
        <nav class="header__nav">
          <RouterLink to="/">Home</RouterLink>
          {
            this.session ?
              <RouterLink to="/logout">Logout</RouterLink>
              : <RouterLink to="/login">Login</RouterLink>
          }
          
        </nav>
      </header>,
      <RouterView />
    ]);
  },
});
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 2rem;
  &__nav {
    display: flex;
    gap: 1rem;
  }
}
</style>
