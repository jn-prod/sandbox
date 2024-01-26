<template>
  <section class="container">
    <div class="row pt-5 mb-2">
      <aside class="col-md-4 mx-auto p-2 text-center bg-light">
        <h4>{{ profil.firstname }} {{ profil.lastname }}</h4>
        <div class="d-block text-muted text-capitalize">
          <i class="fas fa-map-marker-alt mr-2"></i>{{ profil.city }}
        </div>
        <div class="row py-3">
          <div class="col-12">
            <div class="d-block border border-white border-right-0 border-left-0 border-bottom-0 pt-4 pb-2">
              <span class="d-block">{{ activities.count.run }} Courses à pied</span>
              <span class="d-block">{{ activities.count.ride }} Sorties vélo</span>
              <span class="d-block">{{ activities.count.hike }} Marches</span>
            </div>
          </div>
        </div>
        <!--         <div class="row py-2">
        <div class="col-12 ">
          <div class="d-block border border-white border-right-0 border-left-0 border-bottom-0 py-2">
            <div class="d-block font-weight-bold">profil.points</div>
            <small class="d-block text-muted">points</small>               
          </div>
        </div>-->
        <div class="row">
          <div class="col-12 mt-3 mb-2 border border-white border-right-0 border-left-0 border-bottom-0">
            <div class="d-block text-center font-weight-bold pt-3">Prochain objectif</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <small v-if="event" class="text-muted">{{ event.date_start }}-{{ event.date_end }} </small
            ><strong>{{ event.name }}</strong>
            <small v-if="!event" class="text-muted mb-2 d-block">Aucun événement à venir</small>
            <a href="/event/add" v-if="config.owner" class="btn btn-outline-dark btn-sm">Ajouter un événement</a>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mt-3 mb-2 border border-white border-right-0 border-left-0 border-bottom-0">
            <div class="d-block text-center font-weight-bold pt-3">Mes formes</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mt-3 mb-2">
            <div class="d-block text-center font-weight-bold">
              <a :href="`/health/${user._id}/overview`" class="btn btn-outline-dark btn-sm">Voir ma dernière forme</a>
            </div>
          </div>
        </div>

        <!-- team -->
        <div class="row">
          <div class="col-12 my-3">
            <div class="d-block border">
              <div class="d-block">
                <div class="text-center font-weight-bold mt-3 d-block">Teams</div>
              </div>
              <div class="d-block">
                <div v-if="config.team" class="d-block mt-3 mb-2">
                  <span>Membre de :</span>
                  <a
                    v-for="(team, key) in teams"
                    :key="key"
                    :href="`/team/${_id}`"
                    class="d-block font-weight-bold my-2"
                    >{{ name }}<small class="text-muted"> - {{ membres.length }} membres</small></a
                  >
                </div>
                <div v-if="!config.team" class="d-block mt-3 mb-2">
                  <small class="text-muted d-block">Vous n'appartenez à aucune team</small>
                </div>

                <div v-if="config.coach" class="d-block mt-3 mb-2">
                  <span>Coach de :</span>
                  <a
                    v-for="(coach, key) in coachs"
                    :key="key"
                    :href="`/team/${_id}`"
                    class="d-block font-weight-bold my-2"
                    >{{ name }}<small class="text-muted"> - {{ membres.length }} membres</small></a
                  >
                </div>
                <div v-if="!config.coach" class="d-block mt-3 mb-2">
                  <small class="text-muted d-block mb-3">Vous n'êtes coach d'aucune team</small>
                  <a href="/team/add" v-if="config.owner" class="btn btn-outline-dark my-2">Créer une équipe</a>
                </div>

                <a
                  v-if="config.team_load_more"
                  :href="`/team/${user._id}/overview`"
                  class="text-muted my-2 btn btn-outline-light"
                  ><small>Voir toutes les teams</small></a
                >
              </div>
            </div>
          </div>
        </div>

        <!-- applications connectées -->
        <div v-if="config.owner" class="row">
          <div class="col-12 my-3">
            <div class="d-block">
              <div class="text-center font-weight-bold">Applications</div>
            </div>
            <div class="d-block text-center">
              <a v-if="user.strava_refresh_token" href="/auth/strava" class="btn btn-outline-light"
                ><i class="fab fa-strava text-primary"></i> <small class="text-primary">Strava connecté</small></a
              >
              <a v-if="!user.strava_refresh_token" href="/auth/strava" class="btn btn-outline-light"
                ><i class="fab fa-strava text-muted"></i> <small class="text-muted">Strava non-connecté</small></a
              >
            </div>
          </div>
        </div>
      </aside>

      <!-- activités -->
      <section class="col-md-8 mx-auto">
        <h4 class="pl-3 text-left">Performance Balance</h4>
        <div class="row py-5">
          <article class="col-4 text-center">
            <div class="h1">
              {{ training_stress_balance.ctl }}
            </div>
            <div class="text-muted">Fitness</div>
          </article>
          <article class="col-4 text-center">
            <div class="h1">
              {{ training_stress_balance.atl }}
            </div>
            <div class="text-muted">Fatigue</div>
          </article>
          <article class="col-4 text-center">
            <div class="h1">
              {{ training_stress_balance.total }}
            </div>
            <div class="text-muted">Forme</div>
          </article>
        </div>
        <article class="row p-3">
          <div class="col">
            <header class="d-flex justify-content-between">
              <h4 class="my-auto">Activités</h4>
              <b-button-group>
                <b-dropdown right text="Ajouter">
                  <b-dropdown-item @click="createEvent">Créer une activité</b-dropdown-item>
                  <b-dropdown-item @click="importEvent">Importé depuis strava</b-dropdown-item>
                </b-dropdown>
              </b-button-group>
            </header>
            <section class="row" v-if="activities.list">
              <article v-for="(activity, key) in activities.list" :key="key" class="row my-2 py-3 bg-light col-12">
                <div class="col-md-5 col-lg-2 text-center mt-2 mb-2 my-auto text-center">
                  <div class="d-block bg-white p-2 border border-muted rounded">
                    <div class="d-block">
                      <strong>{{ start_date_local }}</strong>
                    </div>
                    <small class="d-block text-muted">{{ start_date_local }}-{{ start_date_local }}</small>
                  </div>
                </div>
                <div class="col-md-7 col-lg-7 mt-2 mb-2">
                  <div class="d-block font-weight-bold">
                    <div class="d-block">
                      <i v-if="type === 'competition'" class="fas fa-flag-checkered d-inline"></i>
                      {{ type }}
                    </div>
                    <span class="mr-2">{{ distance }}Km</span>
                    <span class="m-2">{{ moving_time }}</span>

                    <span v-if="total_elevation_gain" class="m-2">{{ total_elevation_gain }}m</span>

                    <span v-if="calories" class="badge badge-grey">{{ calories }} calories</span>
                  </div>
                  <div class="d-block">
                    <small v-if="tss" class="mr-2 text-muted font-weight-bold">Fatigue {{ tss }}</small>
                  </div>
                </div>
                <div class="col-lg-3 my-auto text-center">
                  <div class="d-block">
                    <div class="dropdown">
                      <button
                        class="btn btn-sm btn-primary btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-ellipsis-v"></i>
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a :href="`/activities/${id}`" class="dropdown-item">Voir l'analyse</a>
                        <a :href="`/activities/${id}/event/select`" class="dropdown-item">Joindre à un événement</a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </section>
            <div v-if="!activities.list" class="col-12">
              <div class="row">
                <div class="col-12">
                  Vous n'avez pas encore enregistré d'activité
                  <a v-if="config.owner" href="/auth/strava" class="btn btn-danger"
                    ><i class="fab fa-strava"></i> Importez vos activités strava</a
                  >
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  </section>
</template>

<script>
import { BButtonGroup, BDropdown, BDropdownItem } from "bootstrap-vue";

export default {
  name: "UserIndex",
  components: { BButtonGroup, BDropdown, BDropdownItem },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      profil: {},
      activities: {
        list: [],
        count: {
          run: null,
          bike: null,
        },
      },
      event: [],
      config: {},
      training_stress_balance: {},
    };
  },
  methods: {
    createEvent() {
      this.$router.push({ name: 'editActivity' })
    },
    importEvent() {
      console.log('importEvent')
    },
  }
};
</script>
