import Tone from 'tone';

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$tone', { value: Tone });
    Object.defineProperty(window, 'Tone', { value: Tone });
  },
};
