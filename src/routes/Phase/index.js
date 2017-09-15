import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'phases',

  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([
    	'./containers/PhaseContainer',
		'./modules/phase'], (require) => {
      const Phase = require('./containers/PhaseContainer').default
      const phaseReducer = require('./modules/phase').default
      const phaseActions = require('./modules/phase').Actions

      /*  Add the reducer to the store on key 'path'  */
      injectReducer(store, { key: 'phase', reducer: phaseReducer })

      const state = store.getState();

      //Add the subject name information to the Phase state!!
      console.log(state.auth.subject.name)

      store.dispatch(phaseActions.fetchPhases())
      store.dispatch(phaseActions.receiveName(state.auth.subject.name))

      /*  Return getComponent   */
      next(null, Phase)

    /* Webpack named bundle   */
    }, 'phase')
  }
})
