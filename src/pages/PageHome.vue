<template>
  <q-page class="constarain q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Vladimir_Tsallagov</q-item-label>
          <q-item-label caption>
            Moscow, Russia
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-img
        class="col"
        src="https://cdn.quasar.dev/img/mountains.jpg"
      />

      <q-card-section>
        <div>Tsallagov Vladimir</div>
        <div class="text-subtitle2">June 10 9:04AM</div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script>

export default {
  name: 'PageHome',
}
</script>

<style scoped lang="scss">
  .card-post {
    .q-img {
      min-height: 200px;
    }
  }
</style>
