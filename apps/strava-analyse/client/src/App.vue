<template>
  <div id="app" class="container-fluid">
    <Header :user="user"></Header>

    <div class="container-fluid pb-5" role="main">
      <!-- built files will be auto injected -->
      <router-view @connexion="login"></router-view>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import Auth from "@/services/utils/auth";

const authService = new Auth();

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      user: authService.getUser() || null,
    }
  },
  methods: {
    login(data) {
      this.user = data;
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
