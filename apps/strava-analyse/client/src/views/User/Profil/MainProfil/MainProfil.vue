<template>
  <div class="row">
    <div class="col-12 p-5 bg-light">
      <h1 class="mt-5 mb-5">Profil</h1>

      <DisplayProfil :user="user" v-if="!edit" />

      <EditProfil :user="user" v-if="edit" @update-user="updateUser" />

      <div class="mt-5" v-if="!edit">
        <button class="btn btn-danger mx-2" ><i class="fas fa-trash-alt mr-2"></i>Supprimer mon compte</button>
        <button class="btn btn-primary mx-2" @click="toogleEdit"><i class="fas fa-pencil-alt mr-2"></i>Modifier</button>
      </div>
    </div>
  </div>
</template>

<script>
import {cloneDeep} from 'lodash'
import DisplayProfil from "@/views/User/Profil/DisplayProfil/DisplayProfil.vue";
import EditProfil from "@/views/User/Profil/EditProfil/EditProfil.vue";

export default {
  name: "MainProfil",
  components: {
    DisplayProfil,
    EditProfil
  },
  props: {
    userId: {
      type: String,
      required: true
    },
    userService: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      user: {},
      originUser: {},
      edit: false,
    };
  },
  async mounted() {
    this.originUser = await this.userService.get(this.userId)
    this.user = cloneDeep(this.originUser)
  },
  methods: {
    toogleEdit() {
      this.edit = !this.edit;
    },
    updateUser({user}) {
      this.userService.update(this.originUser, user)
    }
  }
};
</script>
