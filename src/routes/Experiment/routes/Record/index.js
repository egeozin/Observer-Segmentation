import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
	path:'record',

	getComponent (nextState, next){
		require.ensure([
			'./containers/RecordContainer',
			'./modules/record'], (require) => {
			const Record = require('./containers/RecordContainer').default
			const recordReducer = require('./modules/record').default
			
			injectReducer(store, {
				key: 'record',
				reducer: recordReducer
			})
			next(null, Record)
		})
	}
})