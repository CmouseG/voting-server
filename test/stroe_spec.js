import {
	Map,
	fromJS
} from 'immutable';
import {
	expect
} from 'chai';

import makeStroe from '../src/store';

describe('store', () => {
	it('is a Redux store configured with the correct reducer', () => {
		const store = makeStroe();
		expect(store.getState()).to.equal(Map());

		store.dispatch({
			type: 'SET_ENTRIES',
			entries: ['Trainspotting', '28DaysLater']
		});
		expect(store.getState()).to.equal(fromJS({
			entries: ['Trainspotting', '28DaysLater']
		}));
	});
});