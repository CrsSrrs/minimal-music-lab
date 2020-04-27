<template>
  <section class="sequence-part">
    <div class="grid-row">
      <div class="grid-col">
        <h2>Phasing</h2>
      </div>
      <div class="grid-col">
        #-Buttons:
        <input type="number" v-model="btns" min="1" max="32">
      </div>
      <div class="grid-col">
        <p>Phasing Tempo: {{ parseInt(temp, 10) + 1 }}</p>
      </div>
      <div class="grid-col">
        <a @click="$emit('remove', index)">Remove</a>
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
  </section>
</template>

<script>
export default {
  name: 'Phasing',
  props: {
    rows: {
      type: Number,
      default: 1,
    },
    columns: {
      type: Number,
      default: 12,
    },
    temp: {
      default: 80,
    },
    index: {
      type: Number,
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
  },
  mounted() {
    this.initSequence();
    this.$tone.Transport.on('stop', () => {
      this.count = 0;
      this.clearSequenceHighlight(this.$refs.sequenceButton);
      this.clearSequenceHighlight(this.$refs.progressSequenceButton);
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

      const phased = new this.$tone().toSeconds(`${this.btns}n`) - (1 / ((this.temp + 1) * (this.btns / 4)));

      this.sequence = new this.$tone.Sequence((time, col) => {
        if (this.tones[col]) {
          this.synth.triggerAttackRelease('C3', '12n');
        }

        this.$tone.Draw.schedule(() => {
          this.setSequenceHighlight(this.$refs.sequenceButton, col);
        });
      }, [...Array(parseInt(this.btns, 10)).keys()], `${this.btns}n`).start(0);

      this.secondSequence = new this.$tone.Sequence((time, col) => {
        if (this.progressTones[col]) {
          this.secondSynth.triggerAttackRelease('E3', '12n');
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
<style scoped lang="scss"> </style>
