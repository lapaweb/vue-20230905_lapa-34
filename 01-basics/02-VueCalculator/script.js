import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
  data() {
    return {     
      inputValue1: 0,
      inputValue2: 0,
      radioPicked: 'sum'
    };
  },

  computed: {
    result() {
      switch (this.radioPicked) {
        case 'sum':
          return this.inputValue1 + this.inputValue2;
        case 'subtract':
          return this.inputValue1 - this.inputValue2;
        case 'multiply':
          return this.inputValue1 * this.inputValue2;
        case 'divide':
          return this.inputValue1 / this.inputValue2;
        default:
          return undefined;
      }
    },
  },
})

app.mount('#app');
