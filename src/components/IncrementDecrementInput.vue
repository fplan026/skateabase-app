<template>
  <div class="flex items-center justify-center gap-x-4">
    <button class="m-1 btn btn-outline-primary" @click="decrement">
      -
    </button>
    {{ number }}
    <button class="m-1 btn btn-outline-primary" @click="increment">
      +
    </button>
  </div>
</template>
<script>
export default {
  props: {
    initialValue: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.number = this.initialValue
  },
  data() {
    return {
      number: 0
    }
  },
  methods: {
    increment() {
      this.number++;
    },
    decrement() {
      this.number--;
    }
  },
};
</script>

<style>
/* Remove the blue outline when the
 * +/- button gets focus */
.btn:focus {
  outline: none;
  box-shadow: none;
}
</style>