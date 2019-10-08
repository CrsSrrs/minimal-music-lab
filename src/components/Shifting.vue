<template>
  <div class="hello">
    <h1>Shifting</h1>


    <div class="grid-row">
      <div class="grid-col">
        #Buttons:
        <input type="number" v-model="btns" min="1" max="32">
      </div>
      <div class="grid-col">
        <p>Shifted by: {{ Math.floor(count / 4) % columns }}</p>
      </div>
      <div class="grid-col">
        <p>Count: {{ (count % 4) + 1 }}</p>
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
           :class="{ 'is-active': val}">
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
    };
  },
  computed: {
    progressTones() {
      return this.arrayRotate([...this.tones], this.shift);
    },
    shift() {
      return Math.floor(this.count / 4);
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
  },
  mounted() {
    this.initSequence();

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

    clearSequenceHighlight() {
      this.$refs.sequenceButton.forEach((btn) => {
        btn.removeAttribute('highlight');
      });
    },

    initSequence() {
      if (this.sequence) this.sequence.removeAll();
      this.sequence = new this.$tone.Sequence((time, col) => {
        if (this.tones[col]) {
          this.synth.triggerAttackRelease('C4', '32n');
        }

        if (this.progressTones[col]) {
          this.secondSynth.triggerAttackRelease('E4', '32n');
        }

        this.$tone.Draw.schedule(() => {
          this.setSequenceHighlight(col);
          this.$refs.sequenceButton[col].setAttribute('highlight', col);
        });

        if (col === (this.btns - 1)) {
          this.count += 1;
        }
      }, [...Array(parseInt(this.btns, 10)).keys()], '16n').start(0);
    },

    setSequenceHighlight(current) {
      this.clearSequenceHighlight();
      this.$refs.sequenceButton[current].setAttribute('highlight', current);
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

  .hello {
    margin-bottom: 128px;
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
