<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="getPreviousMonth()"></button>
        <div class="calendar-view__date"> {{ currentMonthText }} </div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="getNextMonth()"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div v-for="day in arrPreviosMonth" :key = "day" class="calendar-view__cell calendar-view__cell_inactive" tabindex="0">
        <div  class="calendar-view__cell-day"> {{ day.getDate() }} </div>
        <div class="calendar-view__cell-content"></div>
      </div>
      <div v-for="day in arrCurrentMonthWithMeetups" :key = "day" class="calendar-view__cell" tabindex="0">
        <div  class="calendar-view__cell-day"> {{ day.date.getDate() }} </div>
        <div class="calendar-view__cell-content" v-for="title in day.titles" :key="title"> 
            <a href class="calendar-event">{{ title }}</a>
        </div>
      </div>
      <div v-for="day in arrNextMonth" :key = "day" class="calendar-view__cell calendar-view__cell_inactive" tabindex="0">
        <div  class="calendar-view__cell-day"> {{ day.getDate() }} </div>
        <div class="calendar-view__cell-content"> </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),

    };
  },

  computed: {
    arrCurrentMonth() {
      const length = this.getLengthCurrentMonth();
      let arr = [];
      for (let i = 1; i <= length; i++) {
        arr.push(new Date((this.date).getFullYear(), (this.date).getMonth(), i));
      }
      return arr;
    },

    arrCurrentMonthWithMeetups() {

      return this.arrCurrentMonth.map((date) => {
        const meetups = this.getMeetupMap().get(date.getTime()) ?? [];
        const titles = meetups.map((meetup) => meetup.title);

        return { date, titles };
      })
    },

    arrPreviosMonth() {
      return this.getDays(new Date(this.date), this.getCountDaysPreviosMonth(), 'previos');
    },

    arrNextMonth() {
      return this.getDays(new Date(this.date), this.getCountDaysNextMonth(), 'next');
    },
    
    currentMonthText() {
      const monthYear = this.date.toLocaleString(navigator.language, {       
        month: 'long',
        year: 'numeric'      
      });
      return monthYear;
    },
  },

  methods: {
    getMeetupMap() {
      const meetupMap = new Map();

      this.meetups.forEach((meetup) => {
        const dateWithoutTime = new Date(new Date(meetup.date).toDateString()).getTime();

        const meetups = meetupMap.has(dateWithoutTime) ? [...meetupMap.get(dateWithoutTime), meetup] : [meetup]
        meetupMap.set(dateWithoutTime, meetups);
      });

      return meetupMap;
    },
    getDays(date, count, mode) {
      const lengthPrevios = new Date((date).getFullYear(), (date).getMonth(), 0).getDate();
      let arr = [];
        switch (mode) {
          case 'previos':
            for (let i = lengthPrevios - count + 1; i <= lengthPrevios; i++) {
               arr.push(new Date((date).getFullYear(), (date).getMonth() - 1, i));
            };
            return arr;
          case 'next':
            for (let i = 1; i <= count; i++) {
               arr.push(new Date((date).getFullYear(), (date).getMonth() + 1, i));
            }
           return arr;
        }
    },
    getCountDaysPreviosMonth() {
      const firstDayCurrentMonth = (new Date((this.date).getFullYear(), (this.date).getMonth(), 1)).getDay();
      return firstDayCurrentMonth > 0 ? firstDayCurrentMonth - 1 : 6;
    },
    getCountDaysNextMonth() {
      const lastDayCurrentMonth = (new Date((this.date).getFullYear(), (this.date).getMonth(), this.getLengthCurrentMonth())).getDay();
      return lastDayCurrentMonth > 0 ? 7 - lastDayCurrentMonth : 0;
    },
    getLengthCurrentMonth() {
      return new Date((this.date).getFullYear(), (this.date).getMonth() + 1, 0).getDate();
    },
    getNextMonth() {
      this.date = new Date((this.date).getFullYear(), (this.date).getMonth() + 1, 1);
    },
    getPreviousMonth() {
      this.date = new Date((this.date).getFullYear(), (this.date).getMonth() - 1, 1);
    },
  }
};
</script>

<style scoped>

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
