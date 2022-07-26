<template>
  <q-page class="constarain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video class="full-width" autoplay playsinkline ref="video"></video>
      <canvas class="full-width" height="240" ref="canvas"></canvas>
    </div>
    <div class="text-center q-pa-md">
      <q-btn size="lg" round color="grey-10" icon="eva-camera" @click="captureImage"/>
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
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true,
      }).then(stream => {
        this.$refs.video.srcObject = stream;
      });
    },
    captureImage() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  },
  mounted() {
    this.initCamera();
  }
}
</script>

<style scoped lang="scss">
  .camera-frame {
    border: 2px solid $grey-5;
    border-radius: 10px;
  }
</style>
