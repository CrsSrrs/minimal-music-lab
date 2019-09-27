<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>

    <tone-play-toggle ref="playButton"></tone-play-toggle>
    <tone-step-sequencer rows="1" columns="16" ref="stepSequencer"></tone-step-sequencer>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  mounted() {
    const synth = new this.$tone.Synth().toMaster();

    new this.$tone.Sequence((time, col) => {
      const columns = this.$refs.stepSequencer.currentColumn;

      columns.forEach((val) => {
        if (val) {
          synth.triggerAttackRelease('C4', '16n');
        }
      });

      this.$tone.Draw.schedule(() => {
        this.$refs.stepSequencer.setAttribute('highlight', col);
      });
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n').start(0);

    this.$refs.playButton.bind(this.$tone.Transport);
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
</style>
