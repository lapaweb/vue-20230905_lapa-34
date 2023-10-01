import { defineComponent } from '../vendor/vue.esm-browser.js';

const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' }

export default defineComponent({
  name: 'MeetupInfo',

  optionsDate,

  props: {
    organizer: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
    date: {
      type: Number,
      required: true
    }
  },

  computed: {
    localeDate() {
      return (new Date(this.date)).toLocaleDateString(navigator.language, optionsDate)
    },
    dateTime() {
      return new Date(this.date).toISOString().slice(0, 10);
    },
  }, 

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="dateTime"> {{ localeDate}} </time>
      </li>
    </ul>`,
});
