<script lang="tsx">
import { defineComponent } from 'vue';
import { client } from '../common/services/supabase.service';
import type { ILoginViewDatas } from './auth.conf';

export default defineComponent({
  data(): ILoginViewDatas {
    return {
      loading: false,
      email: ''
    }
  },
  methods: {
    async handleLogin(event: Event) {
      event.preventDefault();
      try {
        this.loading = true
        const { error } = await client.auth.signInWithOtp({
          email: this.email,
        })
        if (error) throw error
        alert('Check your email for the login link!')
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        this.loading = false
      }
    }
  },
  render() {
    return (
      <form onSubmit={this.handleLogin}>
          <p class="description">Sign in via magic link with your email below</p>
          <input
            required
            type="email"
            placeholder="Your email"
            v-model={this.email}
          />
          <input
            type="submit"
            value={this.loading ? 'Loading' : 'Send magic link'}
            disabled={this.loading}
          />
      </form>
    );
  },
});
</script>
