import { gigService } from '../services/gig.service.js'


export const gigStore = {
    state: {
        gigs: []
    },
    getters: {
        gigs(state) { return state.gigs },
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs;
        },
        addGig(state, { gigs }) {
            state.gigs.push(gigs)
        },
        removGig(state, { gigId }) {
            state.gigs = state.gigs.filter(gig => gig._id !== gigId)
        },
    },
    actions: {
        async addGig(context, { gig }) {
            try {
                gig = await gigService.add(gig)
                context.commit({ type: 'addGig', gig })
                    // context.dispatch({type: 'increaseScore'})

                return gig;
            } catch (err) {
                console.log('gigStore: Error in addGig', err)
                throw err
            }
        },
        async loadGigs(context) {
            try {
                const gigs = await gigService.query();
                context.commit({ type: 'setGigs', gigs })


            } catch (err) {
                console.log('gigStore: Error in loadGigs', err)
                throw err
            }
        },
        async removeGig(context, { gigId }) {
            try {
                await gigService.remove(gigId);
                context.commit({ type: 'removeGig', gigId })
            } catch (err) {
                console.log('gigStore: Error in removegig', err)
                throw err
            }
        },

    }
}