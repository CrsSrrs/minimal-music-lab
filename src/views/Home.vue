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
    <div v-if="modules.length > 0">
      <component v-for="(module, index) in modules" :key="index" :is="module" :index="index" :temp="temp" @remove="removeModule"></component>
    </div>
    <p class="mb-m">
      Chose a technique. You can add multiple techniques. All techniques will be played at the same time.
    </p>
    <a class="button" @click="addShifting">Add Shifting</a> or
    <a class="button" @click="addPhasing">Add Phasing</a>
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
      modules: [],
      temp: 80,
    };
  },
  watch: {
    temp(val) {
      this.$tone.Transport.bpm.value = val;
    },
  },
  created() {
    this.$tone.Transport.bpm.value = this.temp;
    this.$tone.Transport.swingSubdivision = '12n';
  },
  mounted() {
    this.$refs.playButton.bind(this.$tone.Transport);
  },
  methods: {
    addShifting() {
      this.modules.push(Shifting);
    },

    addPhasing() {
      this.modules.push(Phasing);
    },

    removeModule(index) {
      this.modules.splice(index, 1);
    },
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
    cursor: pointer;

    font-weight: bold;

    transition: color .4s ease;
    &:hover {
      color: darken(#42b983, 10);
    }
  }

  .mb-m {
    margin-bottom: 32px;
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

  .home {
    padding-bottom: 80px;
  }

  .button {
    padding: 16px;
    margin-left: 8px;
    margin-right: 8px;

    display: inline-block;
    cursor: pointer;
    border: 1px solid #42b983;
    border-radius: 5px;

    background-color: #42b983;
    color: #fff;

    font-weight: bold;
    transition: background-color .4s ease, color .4s ease;

    &:hover {
      background-color: transparent;
      color: #42b983;
    }
  }
</style>
