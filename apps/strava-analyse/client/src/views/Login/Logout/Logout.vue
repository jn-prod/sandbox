<template>
    <div class="text-center">
      <b-spinner label="Spinning"></b-spinner>
    </div>
</template>

<script>
// libraries
import { BSpinner } from 'bootstrap-vue'

export default {
  name: "logout",
  props:{
    authService: {
      type: Object,
      required: true
    }
  },
  components: {
    BSpinner
  },
  mounted() {
    this.authService.removeToken();
    this.$emit('connexion')
    this.$router.push({ name: 'index' })
  }
};
</script>