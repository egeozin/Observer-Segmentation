// We need to import the Child Routes here

import RecordRoute from './routes/Record'
import AnalysisRoute from './routes/Analysis'

import { injectReducer } from '../../store/reducers'

export default (store) => ({
	path:'experiment',

	childRoutes: [
		RecordRoute(store),
		AnalysisRoute(store),
	],

	getComponent (nextState, next){
		require.ensure([
			'./containers/ExperimentContainer',
			'./modules/experiment'], (require) => {
			const Experiment = require('./containers/ExperimentContainer').default
			const experimentReducer = require('./modules/experiment').default
			
			injectReducer(store, {
				key: 'experiment',
				reducer: experimentReducer
			})
			next(null, Experiment)
		})
	}
})