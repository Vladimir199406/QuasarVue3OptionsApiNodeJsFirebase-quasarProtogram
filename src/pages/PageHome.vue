<template>
  <q-page class="constarain q-pa-md">


    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card class="my-card q-mb-md" flat bordered v-for="(post, index) in posts" :key=post.id>

          <q-separator />

          <q-img class="col" :src="post.imageUrl" />

          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-subtitle2">
              {{ getFormattedDate(index) }}
            </div>
          </q-card-section>

        </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
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
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar';

export default {
  name: 'PageHome',
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: 'Frontend Developer',
          date: 1658837958735,
          location: 'Moscow, Russia',
          imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg'
        },
                {
          id: 2,
          caption: 'Frontend Developer',
          date: 1658837958735,
          location: 'Moscow, Russia',
          imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg'
        },
                {
          id: 3,
          caption: 'Frontend Developer',
          date: 1658837958735,
          location: 'Moscow, Russia',
          imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg'
        },
      ],
    }
  },
  methods: {
    getFormattedDate(index) {
      const post = this.posts[index];
      const formattedDate = date.formatDate(post.date, 'MMMM D h:mmA');
      return formattedDate;
    }
  },

}
</script>

<style scoped lang="scss">
  .card-post {
    .q-img {
      min-height: 200px;
    }
  }
</style>
