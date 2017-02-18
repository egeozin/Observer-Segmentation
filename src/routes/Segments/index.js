import { injectReducer } from '../../store/reducers'

export default (store) => ({
	path:'segments',
	getComponent (nextState, next){
		require.ensure([
			'./containers/SegmentsContainer',
			'./modules/segments'], (require) => {
			const Segments = require('./containers/SegmentsContainer').default
			const segmentsReducer = require('./modules/segments').default
			injectReducer(store, {
				key: 'segments',
				reducer: segmentsReducer
			})
			next(null, Segments)
		})
	}
})