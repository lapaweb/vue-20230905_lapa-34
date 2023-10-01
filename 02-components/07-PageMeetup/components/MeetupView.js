import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupCover from './MeetupCover.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupAgenda from './MeetupAgenda.js';
import MeetupInfo from './MeetupInfo.js';



export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <MeetupCover :title = "meetup.title" :image = "meetup.image"/>

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description = "meetup.description" />
            <h3>Программа</h3>
            <UiAlert v-if="!meetup.agenda.length">Программа пока пуста...</UiAlert>
            <MeetupAgenda v-else :agenda = "meetup.agenda" />
          </div>
          <div class="meetup__aside">
            <MeetupInfo :organizer = "meetup.organizer" :place = "meetup.place" :date = "meetup.date" />
          </div>
        </div>
      </UiContainer>
    </div>`,
});
