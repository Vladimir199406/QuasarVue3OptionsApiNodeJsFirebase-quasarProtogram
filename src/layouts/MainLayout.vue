<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal>
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
        <q-toolbar-title>Quasar Protogram</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white" bordered>
        <q-tabs
          indicator-color="transparent"
          class="text-grey-10"
          active-color="primary"
        >
          <q-route-tab to="/" name="home" icon="eva-home-outline" />
          <q-route-tab to="/camera" name="camera" icon="eva-camera-outline" />
        </q-tabs>
    </q-footer>

    <q-page-container>
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
  .q-footer {
    .q-tab__icon {
      font-size: 30px;
    }
  }
</style>