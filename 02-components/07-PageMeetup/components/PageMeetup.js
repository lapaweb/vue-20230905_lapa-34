import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupCover from './MeetupCover.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupAgenda from './MeetupAgenda.js';
import MeetupInfo from './MeetupInfo.js';
import MeetupView from './MeetupView';

import { fetchMeetupById } from '/Users/lapa/Projects/vue-20230905_lapa-34/02-components/07-PageMeetup/meetupService.js';



export default defineComponent({
  name: 'PageMeetup',

  fetchMeetupById,

  data() {
    return {
      meetup: undefined,
      error: '',
    }
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      require: true,
    },
  },

    watch: {
      meetupId: {
        handler: 'fetchMeetupFromWatcher',
        immediate: true
      }
    },
    
    methods: {
      async fetchMeetupFromWatcher() {
        this.meetup = undefined;
        try {
          this.meetup = await fetchMeetupById(this.meetupId);
        } catch (error) {
          this.error = error;
        }
      }
    },
  
  
  
  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <MeetupView v-if="meetup" :meetup = "meetup">
      </MeetupView>
        
      <UiContainer v-else-if="!meetup & !error">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else-if="!meetup">
        <UiAlert> {{ error.message }} </UiAlert>
      </UiContainer>
    </div>`,
});
