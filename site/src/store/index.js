import Vue from 'vue';
import Vuex from 'vuex';
import medicine from './module/medicine';
import product from './module/product';
import client from './module/client';
import appointment from './module/appointment';
import user from './module/user';
import patient from './module/patient';
import sale from './module/sale';
import record from './module/record';

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      medicine,
      product,
      client,
      appointment,
      user,
      patient,
      sale,
      record,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: false,
  });

  return Store;
}
