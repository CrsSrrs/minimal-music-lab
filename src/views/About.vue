<template>
  <div class="about">
    <div class="site-inner  -blog">
      <h1>About</h1>
      <section>
        <p>The Minimal Music Lab was created as part of a student research project at the <a href="https://hs-duesseldorf.de/" target="_blank">Düsseldorf University of Applied Sciences</a> in Germany. The thesis deals with the development of the Minimal Music movement and highlights the characteristics and techniques of Minimal Music. This application is intended to serve as an interactive insight and playful understanding of some techniques.</p>
      </section>
      <section>
        <h2>What is Minimal Music?</h2>
        <p>Minimal Music is a movement of <a href="https://en.wikipedia.org/wiki/Neue_Musik" target="_blank">new music</a> in the 20th century. The music of this era is changed with new sounds, new forms or new connections of old music styles. Experimental compositions are created that break away from the rules of previous composers. Minimal music is characterized by reduction, repetition, improvisation and the use of unconventional techniques.</p>
      </section>
      <section>
        <h2>What means Phasing?</h2>
        <p>Phasing, or phase shifting, is the natural course of a sound shift that occurs when two instruments start playing the same melody at the same time, while the second instrument plays slightly faster. <a href="https://en.wikipedia.org/wiki/Steve_Reich" target="_blank">Steve Reich</a> uses this technique in his compositions. Instead of instruments, he uses the spoken word of a human being. For example in his composition "It's Gonna Rain":</p>
        <div class="ratio-box">
          <div class="content">
            <iframe src="https://www.youtube-nocookie.com/embed/bg4-AtqhKh8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </section>
      <section>
        <h2>What means Shifting?</h2>
        <p>Shifting is also a phase shift, while the second voice is not shifted continuously, but directly by one beat. With phasing, this state of phase shifting is also achieved, but with shifting the natural, asynchronous sounding transition to the harmonic sounding phases is skipped. Steve Reichs "Clapping Music" is a perfect example for this technique:</p>
        <div class="ratio-box">
          <div class="content">
            <iframe src="https://www.youtube-nocookie.com/embed/lzkOFJMI5i8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  h1, h2, h3, h4 {
    margin-bottom: 24px;
    margin-top: 0;
    line-height: 1.25em;
  }

  h1 {
    font-size: 40px;
  }

  a {
    text-decoration: none;
  }

  p {
    margin-bottom: 24px;
    font-size: 18px;
    line-height: 27px;
  }

  section {
    margin-bottom: 64px;
    text-align: left;
  }

  iframe {
    width: 100%;
    height: 100%;
  }

  .ratio-box {
    width: 100%;
    display: block;
    overflow: hidden;
    position: relative;

    &::before {
      content: ' ';
      display: block;
      padding-top: 56.25%;
    }

    .content {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
  }

  .site-inner.-blog {
    max-width: 720px;
  }
</style>
