<template>
  <button
  @click=plusCount()>{{ localCount }}</button>
</template>

<script>

import { klona } from 'klona';
import { dequal } from 'dequal';

export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0
    } 
  },
  
  emits: ['update:count'],

  data() {
    return {
      localCount: undefined,
    };
  },

  watch: {
    count:
    {
      deep: true,
      immediate: true,
      handler() {
        if (!dequal(this.localCount, this.count)) {
          this.localCount = klona(this.count);
        }
      },
    },
    localCount: {
      deep: true,
      handler() {
        this.$emit('update:count', klona(this.localCount));
      },
    },
  },

  methods: {
    plusCount() {
      return this.localCount = this.localCount + 1
    },
  },
};
</script>
