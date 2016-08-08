import {
	List,
	Map
} from 'immutable';
import {
	expect
} from 'chai';

import {
	setEntries,
	next,
	vote
} from '../src/core';

describe('application logic', () => {
	describe('setEntries', () => {
		it('adds the entries to the state', () => {
			const state = Map();
			const entries = List.of('Trainspotting', '28DaysLater');
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28DaysLater')
			}));
		});

		it('convert to immutable', () => {
			const state = Map();
			const entries = ['Trainspotting', '28DaysLater'];
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28DaysLater')
			}));
		});
	});

	describe('next', () => {
		it('takes the next two entries under vote', () => {
			const state = Map({
				entries: List.of('Trainspotting', '28DaysLater', 'Sunshine')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28DaysLater')
				}),
				entries: List.of('Sunshine')
			}));
		});

		it('puts winner of current vote back to entries', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28DaysLater'),
					tally: Map({
						'Trainspotting': 4,
						'28DaysLater': 2
					})
				}),
				entries: List.of('Sunshine', 'Millions', '127Hours')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions')
				}),
				entries: List.of('127Hours', 'Trainspotting')
			}));
		});

		it('puts both from tied vote back to entries', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28DaysLater'),
					tally: Map({
						'Trainspotting': 3,
						'28DaysLater': 3
					})
				}),
				entries: List.of('Sunshine', 'Millions', '127Hours')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sunshine', 'Millions')
				}),
				entries: List.of('127Hours', 'Trainspotting', '28DaysLater')
			}));
		});

		it('marks winner when just one entry left', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28DaysLater'),
					tally: Map({
						'Trainspotting': 4,
						'28DaysLater': 2
					})
				}),
				entries: List()
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				winner: 'Trainspotting'
			}));
		});
	});

	/*describe('vote', () => {
		it('create a tally for the voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28DaysLater')
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28DaysLater'),
					tally: Map({
						'Trainspotting': 1
					})
				}),
				entries: List()
			}));
		});

		it('adds to existing tally for the voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28DaysLater'),
					tally: Map({
						'Trainspotting': 3,
						'28DaysLater': 2
					})
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28DaysLater'),
					tally: Map({
						'Trainspotting': 4,
						'28DaysLater': 2
					})
				}),
				entries: List()
			}))
		});
	});*/

	describe('vote', () => {
		it('creates a tally for the voted entry', () => {
			const state = Map({
				pair: List.of('Trainspotting', '28DaysLater')
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState).to.equal(Map({
				pair: List.of('Trainspotting', '28DaysLater'),
				tally: Map({
					'Trainspotting': 1
				})
			}));
		});

		it('adds to existing tally for the voted entry', () => {
			const state = Map({
				pair: List.of('Trainspotting', '28DaysLater'),
				tally: Map({
					'Trainspotting': 3,
					'28DaysLater': 2
				})
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState).to.equal(Map({
				pair: List.of('Trainspotting', '28DaysLater'),
				tally: Map({
					'Trainspotting': 4,
					'28DaysLater': 2
				})
			}));
		});
	});
});