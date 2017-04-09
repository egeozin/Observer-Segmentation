// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import LoginLayout from '../layouts/LoginLayout'
import Home from './Home'
import CounterRoute from './Counter'
import ExperimentRoute from './Experiment'
import ZenRoute from './Zen'
import AuthRoute from './Auth'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */



export const createRoutes = (store) => {

  const requireAuth = (nextState, replace, cb) => {
    const state = store.getState();
    console.log(state);
    console.log(nextState);
    if (!state.auth) {
      replace({
        pathname:'/signup',
        state:{nextPathname: nextState.location.pathname}
      });
    }
    cb();
  
  }

  return ({
      path        : '/',
      //component   : CoreLayout,
      //indexRoute  : Home,
      childRoutes : [

        {
          component:CoreLayout,
          onEnter: requireAuth,
          indexRoute: Home,
          childRoutes: [
            CounterRoute(store),
            ZenRoute(store),
            ExperimentRoute(store)
          ]
        },
      
        {
          component: LoginLayout,
          childRoutes: [
            AuthRoute(store)
          ]

        }, 

      ]
  });

};


/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
