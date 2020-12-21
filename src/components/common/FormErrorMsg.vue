<template>
  <small class="red--text">{{ errors[0] }}</small>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
