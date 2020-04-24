<template>
  <div class="home">
    <div class="main-controls">
      <div class="grid-row  -centered">
        <div class="grid-col">
          <h2>Main Controls</h2>
        </div>
        <div class="grid-col">
          Tempo:
          <input type="number" v-model="temp" min="1" max="320">
        </div>
        <div class="grid-col">
          <tone-play-toggle ref="playButton"></tone-play-toggle>
        </div>
      </div>
    </div>
    <Shifting></Shifting>
    <Phasing :temp="temp"></Phasing>
  </div>
</template>

<script>
// @ is an alias to /src
import Shifting from '@/components/Shifting.vue';
import Phasing from '@/components/Phasing.vue';

export default {
  name: 'home',
  data() {
    return {
      temp: 80,
    };
  },
  watch: {
    temp(val) {
      this.$tone.Transport.bpm.value = val;
    },
  },
  mounted() {
    this.$tone.Transport.bpm.value = this.temp;
    this.$refs.playButton.bind(this.$tone.Transport);
  },
  components: {
    Shifting,
    Phasing,
  },
};
</script>


<style scoped lang="scss">
  .main-controls {
    margin-bottom: 40px;
  }
</style>

<style lang="scss">
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  hr {
    margin-top: 4px;
    margin-bottom: 4px;
    border-color: transparent;
  }

  .grid-row {
    display: flex;
    align-items: center;
    margin-left: -16px;
    margin-right: -16px;

    margin-bottom: 16px;

    &.-centered {
      justify-content: center;
    }
  }

  .grid-col {
    padding-left: 16px;
    padding-right: 16px;
  }

  .row {
    display: flex;
  }

  .column {
    height: 60px;
    background-color: #e1e4e7;
    border-top: 4px solid #e1e4e7;

    flex: 1;
    flex-direction: column;


    &:not(:last-child) {
      border-right: 1px solid #444D56;
    }

    &:not(.-computed) {
      cursor: pointer;
    }

    &:not(.-computed):hover {
      background-color: lighten(#42b983, 10);
    }

    &[highlight] {
      border-top: 4px solid darken(#42b983, 5);
    }

    &.is-active {
      background-color: #42b983;
    }

    &.-computed {
      &.is-active {
        background-color: #959DA5;
      }
    }
  }
</style>
