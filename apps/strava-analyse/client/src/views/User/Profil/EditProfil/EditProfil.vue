<template>
  <div>
    <form id="edit-user" @submit="updateUser">
      <div class="row">
        <div class="col-md-6">
          <!-- firstname -->
          <div class="form-group">
            <label for="firstname">Prénom <span class="text-danger">*</span></label>
            <input type="text" v-model="user.firstname" class="form-control" name="firstname" required />
          </div>
        </div>
        <div class="col-md-6">
          <!-- lastname -->
          <div class="form-group">
            <label for="lastname">Nom <span class="text-danger">*</span></label>
            <input type="text" v-model="user.lastname" class="form-control" name="lastname" required />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <!-- city -->
          <div class="form-group">
            <label for="city">Ville <span class="text-danger">*</span></label>
            <input type="text" v-model="user.city" class="form-control" name="city" required />
          </div>
        </div>
        <div class="col-md-6">
          <!-- country -->
          <div class="form-group">
            <label for="country">Pays <span class="text-danger">*</span></label>
            <input type="text" v-model="user.country" class="form-control" name="country" required />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <!-- sex -->
          <div class="form-group">
            <label for="sex">Sex *</label>
            <b-form-select v-model="user.sex" :options="sex" id="sex" required />
            <small class="text-muted ml-2">Requis pour le test de masse grasse</small>
          </div>
        </div>
        <div class="col-md-6">
          <!-- date_of_birth   -->
            <label for="date_of_birth">Date de Naissance </label>
            <b-form-datepicker v-model="user.date_of_birth" id="date" />
            <small class="text-muted ml-2">Necessaire pour la mesure d'activité et le test de masse grasse</small>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <!-- fc_max -->
          <div class="form-group">
            <label for="fc_max"
              >Fréquence cardiaque maximale (bpm)
              </label
            >
            <small class="text-muted ml-2">Necessaire pour la mesure d'activité</small>
            <input class="form-control" type="number" v-model="user.fc_max" id="fc_max" name="fc_max" range="1" min="0" max="220">
          </div>
        </div>
        <div class="col-md-6">
          <!-- height -->
          <div class="form-group">
            <label for="height"
              >Taille (cm)</label
            >
            <small class="text-muted ml-2">Necessaire pour le test de masse grasse</small>
            <input class="form-control" type="number" v-model="user.height" id="height" name="height" min="0" max="300">
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-success mx-2 my-5"><i class="fas fa-pencil-alt mr-2"></i>Enregistrer</button>
    </form>
    <p class="alert alert-warning">* champs obligatoirs</p>
  </div>
</template>

<script>
import { BFormSelect, BFormDatepicker } from "bootstrap-vue";
export default {
  name: "EditProfil",
  components: {
    BFormSelect,
    BFormDatepicker
  },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      sex: [
        { value: "M", text: "Homme" },
        { value: "W", text: "femme" },
      ],
      birthday: null
    }
  },
  mounted() {
    if (this.user.date_of_birth) {
      this.birthday = new Date(this.user.date_of_birth);
    }
  },
  methods: {
    updateUser(e) {
      this.$emit('update-user', {user: this.user})
      e.preventDefault();
    }
  }
};
</script>
