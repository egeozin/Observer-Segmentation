import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'signup',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, next) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Auth = require('./containers/AuthContainer').default
      const authReducer = require('./modules/auth').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'auth', reducer: authReducer })

      /*  Return getComponent   */
      next(null, Auth)

    /* Webpack named bundle   */
    }, 'auth')
  }
})
