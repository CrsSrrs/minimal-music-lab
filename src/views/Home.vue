<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Shifting></Shifting>
    <Phasing></Phasing>
  </div>
</template>

<script>
// @ is an alias to /src
import Shifting from '@/components/Shifting.vue';
import Phasing from '@/components/Phasing.vue';

export default {
  name: 'home',
  components: {
    Shifting,
    Phasing,
  },
};
</script>
