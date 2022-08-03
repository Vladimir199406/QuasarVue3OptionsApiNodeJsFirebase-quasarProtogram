<template>
  <q-page class="constarain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        class="full-width"
        autoplay
        playsinkline
        ref="video"
        v-show="!imageCaptured"
      ></video>
      <canvas
        class="full-width"
        height="240"
        ref="canvas"
        v-show="imageCaptured"
      >
      </canvas>
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        size="lg"
        round
        color="grey-10"
        icon="eva-camera"
        @click="captureImage"
        :disable="imageCaptured"
      />

      <q-file
        v-else
        label="Choose an Image"
        outlined
        v-model="imageUpload"
        accept="image/*"
        @input="captureImageFallback"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        filled
        v-model="post.caption"
        label="Caption *"
        class="col-12 standart-margin-bottom"
      />
      <q-input
        filled
        v-model="post.location"
        label="Location"
        class="col-12 standart-margin-bottom"
        :loading="locationLoading"
      >
        <template v-slot:append>
          <q-btn
            v-if="!locationLoading && locationSupported"
            @click="getLocation"
            round
            dense
            flat
            icon="eva-navigation-2-outline"
          />
        </template>
      </q-input>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        @click="addPost"
        unelevated
        rounded
        color="primary"
        label="Post Image"
        :disable="!post.caption || !post.photo"
      />
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar";
import axios from "axios";

export default {
  name: "PageCamera",
  data() {
    return {
      post: {
        id: uid(),
        caption: "",
        location: "",
        photo: null,
        date: Date.now(),
      },
      imageCaptured: false,
      hasCameraSupport: true,
      imageUpload: [],
      locationLoading: false,
    };
  },
  computed: {
    locationSupported() {
      if ("geolocation" in navigator) {
        return true;
      }
      return false;
    },
  },
  methods: {
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((error) => {
          this.hasCameraSupport = false;
        });
    },

    captureImage() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;

      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      this.post.photo = this.dataURItoBlob(canvas.toDataURL());

      this.disableCamera();
    },

    captureImageFallback(inputEvent) {
      this.post.photo = inputEvent.path[0].files[0];

      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      const reader = new FileReader();

      reader.onload = (event) => {
        let img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          this.imageCaptured = true;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(this.post.photo);
    },

    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      const byteString = atob(dataURI.split(",")[1]);
      // separate out the mime component
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      // write the bytes of the string to an ArrayBuffer
      const ab = new ArrayBuffer(byteString.length);
      // create a view into the buffer
      const ia = new Uint8Array(ab);
      // set the bytes of the buffer to the correct values

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      const blob = new Blob([ab], { type: mimeString });
      return blob;
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },
    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getCityAndCountry(position);
        },
        (error) => {
          this.locationError();
        },
        { timeout: 7000 }
      );
    },
    async getCityAndCountry(position) {
      let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1&auth=581470345323149434864x21126`;
      await axios
        .get(apiUrl)
        .then((result) => {
          this.locationSuccess(result);
        })
        .catch((error) => {
          this.locationError();
        });
    },
    locationSuccess(result) {
      this.post.location = result.data.city;
      if (result.data.country) {
        this.post.location += `, ${result.data.country}`;
      }
      this.locationLoading = false;
    },
    locationError() {
      this.$q.dialog({
        title: "Error",
        message: "Could not find your location",
      });
      this.locationLoading = false;
    },
    addPost() {
      this.$q.loading.show();

      let formData = new FormData();
      formData.append("id", this.post.id);
      formData.append("caption", this.post.caption);
      formData.append("location", this.post.location);
      formData.append("date", this.post.date);
      formData.append("file", this.post.photo, `${this.post.id}png`);

      axios
        .post(`${process.env.API}/createPost`, formData)
        .then((response) => {
          console.log("responce: ", response);
          this.$router.push("/");
          this.$q.notify({
            message: "Post created",
          });
          this.$q.loading.hide();
        })
        .catch((error) => {
          console.log("error: ", error);
          this.$q.dialog({
            title: "Error",
            message: "Could not upload a post",
          });
          this.$q.loading.hide();
        });
    },
  },
  mounted() {
    this.initCamera();
  },
  beforeUnmount() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  },
};
</script>

<style scoped lang="scss">
.camera-frame {
  border: 2px solid $grey-5;
  border-radius: 10px;
}
</style>
