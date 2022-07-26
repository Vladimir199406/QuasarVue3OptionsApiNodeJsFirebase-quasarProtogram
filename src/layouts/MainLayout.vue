<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="constarain">
        <q-btn
          class="large-screen-only q-mr-sm"
          to="/camera"
          flat
          round
          icon="eva-camera-outline"
          size="25px"
          dense
          padding="5px"
        >        
        </q-btn>
        <q-toolbar-title class="text-main-headers">Quasar Protogram</q-toolbar-title>
        <q-btn
          class="large-screen-only"
          to="/"
          flat
          round
          icon="eva-home-outline"
          size="25px"
          dense
          padding="5px"
        >        
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white small-screen-only" bordered>
        <q-tabs
          indicator-color="transparent"
          class="text-grey-10"
          active-color="primary"
        >
          <q-route-tab to="/" name="home" icon="eva-home-outline" />
          <q-route-tab to="/camera" name="camera" icon="eva-camera-outline" />
        </q-tabs>
    </q-footer>

    <q-page-container scoped class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data() {
    return {

    }
  }

}
</script>

<style lang="scss">
  .q-toolbar__title {
    @media (min-width: $breakpoint-sm-min) {
      height: 70px;
    }
  }

  .q-header {
    .q-toolbar__title {
      text-align: center;
      font-size: 25px;

      @media (min-width: $breakpoint-xs-max) {
        text-align: left;
        padding-top: 10px;
      }
    }
  }

  .q-footer {
    .q-tab__icon {
      font-size: 30px;
    }
  }
</style>
