import ToneUI from '@tonejs/ui';

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$toneui', { value: ToneUI });
  },
};
