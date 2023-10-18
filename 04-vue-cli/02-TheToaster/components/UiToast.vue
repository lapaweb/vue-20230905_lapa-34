<template>
  <div class="toast" :class="toastClass">
    <UiIcon :icon=icon />
    <span>{{ message }}</span>
  </div>
</template>


<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: { UiIcon },

  emits: ['close'],

  props: {
    index: {
      type: Number
    },
    class: {
      type: String
    },
    message: {
      type: String
    },
    timeout: {
      type: Number
    },
  },

  computed: {
    icon() {
      switch (this.class) {
        case 'success':
          return 'check-circle';
        case 'error':
          return 'alert-circle';
        default:
          return undefined;
      }
    },

    toastClass() {
      return this.class
    }
  },

  methods: {

    closeByTimer() {
      setTimeout(() => {
        this.close();
      }, 
      this.timeout)
    },
    close() {
      this.$emit('close');
    }
  },


  mounted() {
    this.closeByTimer();
  }

}

</script>


<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
  gap: 12px;
}

.success {
  color: var(--green);
}
.error {
  color: var(--red);
}

</style>
