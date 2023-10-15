<template>
  <div class="toast" :class="toast.toastType">
    <UiIcon :icon=icon />
    <span>{{ toast.message }}</span>
  </div>
</template>


<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: { UiIcon },

  emits: ['closed'],

  props: {
    toast: {
      type: Object,
      default: function () {
        return { 
          toast: {
            toastType: '',
            message: '',
            timeout: 5000,
            index: 0
          },
        }
      }
    },
  },

  computed: {
    icon() {
      switch (this.toast.toastType) {
        case 'success':
          return 'check-circle';
        case 'error':
          return 'alert-circle';
        default:
          return undefined;
      }
    },
  },

  methods: {

    closeByTimer() {
      setTimeout(() => {
        this.close();
      }, 
      this.toast.timeout)
    },
    
    close() {
      this.$emit('closed', this.toast.index);
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

.toast.success {
  color: var(--green);
}
.toast.error {
  color: var(--red);
}

</style>
