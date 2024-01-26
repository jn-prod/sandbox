<template>
  <div>
    <div v-if="user.email"><span class="text-muted">E-mail :</span> {{ user.email }}</div>
    <div v-if="user.firstname"><span class="text-muted">Prénom :</span> {{ user.firstname }}</div>
    <div v-if="user.lastname"><span class="text-muted">Nom :</span> {{ user.lastname }}</div>
    <div v-if="user.sex"><span class="text-muted">Sex :</span> {{ user.sex}}</div>
    <div v-if="user.country"><span class="text-muted">Pays: </span> {{ user.country }}</div>
    <div v-if="user.city"><span class="text-muted">Ville: </span> {{ user.city }}</div>
    <div v-if="user.height"><span class="text-muted">Taille :</span> {{ user.height }}cm</div>
    <div v-if="user.fc_max"><span class="text-muted">Fréquence cardiaque maximale :</span> {{ user.fc_max }}bpm</div>
    <div v-if="user.date_of_birth"><span class="text-muted">Date de naissance :</span> {{user.date_of_birth}}</div>
    <div>
      <span class="text-muted">Compté créé le : {{ user.created_at }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplayProfil",
  props: {
    user: {
      type: Object
    },
  }
}
</script>
