// config
import strava from "@/config/strava";

// libraries
import { BSpinner } from "bootstrap-vue";

export default {
  name: "login",
  components: {
    BSpinner,
  },
  props: {
    code: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
    },
    loginService: {
      type: Object,
      required: true,
    },
    authService: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      strava,
    };
  },
  async mounted() {
    if (this.code) {
      try {
        await this.loginService.postToken(this.code);
        const user =  this.authService.getUser();
        this.$emit('connexion', user)
        this.$router.push({ name: "dashboard", params: { userId: user.id } });
      } catch (err) {
        this.$router.push({ name: "login" });
      }
    } else {
      this.authService.removeToken();
    }
  },
};
