<template>
  <q-page class="constarain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <img src="https://cdn.quasar.dev/img/boy-avatar.png" class="full-width">
    </div>
    <div class="text-center q-pa-md">
      <q-btn size="lg" round color="grey-10" icon="eva-camera" />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input filled v-model="post.caption" label="Caption" class="col-12 standart-margin-bottom" />
      <q-input filled v-model="post.location" label="Location" class="col-12 standart-margin-bottom">
        <template v-slot:append>
          <q-btn round dense flat icon="eva-navigation-2-outline" />
        </template>
      </q-input>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn unelevated rounded color="primary" label="Post Image" />
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar'

export default {
  name: 'PageCamera',
  data() {
    return {
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now(),
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .camera-frame {
    border: 2px solid $grey-5;
    border-radius: 10px;
  }
</style>
