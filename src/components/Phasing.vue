<template>
  <div class="hello">
    <h1>Phasing</h1>


    <div class="grid-row">
      <div class="grid-col">
        #Buttons:
        <input type="number" v-model="btns" min="1" max="32">
      </div>
      <div class="grid-col">
        Tempo:
        <input type="number" v-model="temp" min="1" max="320">
      </div>
      <div class="grid-col">
        <p>Phasing Tempo: {{ parseInt(temp, 10) + 1 }}</p>
      </div>
      <div class="grid-col">
        <tone-play-toggle ref="playButton"></tone-play-toggle>
      </div>
    </div>

    <div class="row" v-for="index in seqs" :key="index">
      <div class="column" v-for="(val, index) in tones" :key="index"
           :class="{ 'is-active': val }"
           @click="$set(tones, index, !val)"
           ref="sequenceButton">
      </div>
    </div>

    <hr>

    <div class="row" v-for="index in seqs" :key="`progress-${index}`">
      <div class="column  -computed" v-for="(val, index) in progressTones" :key="index"
           :class="{ 'is-active': val}"
           ref="progressSequenceButton">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    rows: {
      type: Number,
      default: 1,
    },
    columns: {
      type: Number,
      default: 12,
    },
  },
  data() {
    return {
      btns: this.columns,
      seqs: this.rows,
      count: 0,
      synth: new this.$tone.Synth().toMaster(),
      secondSynth: new this.$tone.Synth().toMaster(),
      tones: Array(this.columns).fill(false),
      temp: 120,
    };
  },
  computed: {
    progressTones() {
      return this.arrayRotate([...this.tones], this.shift);
    },
    shift() {
      return Math.floor(this.count / 4) % 12;
    },
  },
  watch: {
    btns(val, oldVal) {
      this.initSequence();
      if (val < oldVal) {
        this.tones = this.tones.slice(0, this.btns);
      } else if (val > oldVal) {
        this.tones = this.tones.concat(Array(val - oldVal).fill(false));
      }
    },
    temp(val) {
      this.$tone.Transport.bpm.value = val;
    },
  },
  mounted() {
    this.initSequence();
    this.$tone.Transport.bpm.value = this.temp;

    this.$refs.playButton.bind(this.$tone.Transport);
    this.$tone.Transport.on('stop', () => {
      this.count = 0;
      this.clearSequenceHighlight();
    });
  },
  methods: {
    arrayRotate(arr, count) {
      let splice = arr;
      if (count > 0) {
        splice = arr.splice(count * (-1)).concat(arr);
      }
      return splice;
    },

    initSequence() {
      if (this.sequence) this.sequence.removeAll();
      if (this.secondSequence) this.secondSequence.removeAll();

      const seconds = (parseInt(this.temp, 10) / 60) / 16;
      const phased = ((parseInt(this.temp, 10) - 1.5) / 60) / 16;

      console.log(seconds, 'seconds');
      console.log(phased, 'phased');

      this.sequence = new this.$tone.Sequence((time, col) => {
        if (this.tones[col]) {
          this.synth.triggerAttackRelease('C3', '32n');
        }

        this.$tone.Draw.schedule(() => {
          this.setSequenceHighlight(this.$refs.sequenceButton, col);
        });
      }, [...Array(parseInt(this.btns, 10)).keys()], seconds).start(0);

      this.secondSequence = new this.$tone.Sequence((time, col) => {
        if (this.progressTones[col]) {
          this.secondSynth.triggerAttackRelease('E3', '32n');
        }

        this.$tone.Draw.schedule(() => {
          this.setSequenceHighlight(this.$refs.progressSequenceButton, col);
        });
      }, [...Array(parseInt(this.btns, 10)).keys()], phased).start(0);
    },

    setSequenceHighlight(ref, current) {
      this.clearSequenceHighlight(ref);
      ref[current].setAttribute('highlight', current);
    },

    clearSequenceHighlight(ref) {
      ref.forEach((btn) => {
        btn.removeAttribute('highlight');
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
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

  .row {
    display: flex;
  }

  .column {
    height: 60px;
    background-color: lightgrey;
    border-top: 4px solid lightgrey;

    flex: 1;
    flex-direction: column;


    &:not(:last-child) {
      border-right: 1px solid grey;
    }

    &:not(.-computed) {
      cursor: pointer;
    }

    &:not(.-computed):hover {
      background-color: lighten(green, 10%);
    }

    &[highlight] {
      border-top: 4px solid darkgreen;
    }

    &.is-active {
      background-color: green;
    }

    &.-computed {
      &.is-active {
        background-color: grey;
      }
    }
  }

  .grid-row {
    display: flex;
    align-items: center;
    margin-left: -16px;
    margin-right: -16px;

    margin-bottom: 16px;

    justify-content: center;
  }

  .grid-col {
    padding-left: 16px;
    padding-right: 16px;
  }
</style>
