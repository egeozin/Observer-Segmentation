import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
	path:'analysis',

	getComponent (nextState, next){
		require.ensure([
			'./containers/AnalysisContainer',
			'./modules/analysis'], (require) => {
			const Analysis = require('./containers/AnalysisContainer').default
			const analysisReducer = require('./modules/analysis').default
			
			injectReducer(store, {
				key: 'analysis',
				reducer: analysisReducer
			})
			next(null, Analysis)
		})
	}
})