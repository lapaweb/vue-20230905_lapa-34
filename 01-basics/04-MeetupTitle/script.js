import { createApp } from './vendor/vue.esm-browser.js';

// import { title } from "process";

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение

const app = createApp({
  data() {
    return {
      picked: 1,
      meetupTitle: ''
    }
  },
  watch: {
    picked: {
      handler: 'fetchMeetupFromWatcher',
      immediate: true
    }
  },
  methods: {
    async fetchMeetupFromWatcher(id) {
      const response = await fetchMeetupById(id);
      this.meetupTitle = response.title;
    }
  }
})

app.mount('#app');

// fetchMeetupById(1).then((res) => console.log(JSON.stringify(res.title)));