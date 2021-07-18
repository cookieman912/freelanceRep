import { gigService } from '../services/gig.service.js'


export const gigStore = {
    state: {
        gigs: [],
        filterBy: {
            txt: '',
            price: 0,
            category: '',
        }
    },
    getters: {
        gigs(state) { return state.gigs },
        gigsToShow(state) {
            // let gigsToShow = state.gigs.filter(gig => +gig.price >= state.filterBy.price)
            //     .filter(gig => gig.category === state.filterBy.category || state.filterBy.category === '')
            let gigsToShow = state.gigs
            let regex = new RegExp(state.filterBy.txt, 'i')
            return gigsToShow.filter(gig => regex.test(gig.title) || regex.test(gig.description))
        },
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs;
        },
        addGig(state, { gigs }) {
            state.gigs.push(gigs)
        },
        // addReview(state, { review }) {
        //     state.gigs.push(gigs)
        // },
        removeGig(state, { gigId }) {
            state.gigs = state.gigs.filter(gig => gig._id !== gigId)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
    },
    actions: {
        async addGig(context, { gig }) {
            try {
                gig = await gigService.save(gig)
                context.commit({ type: 'addGig', gig })
                // context.dispatch({type: 'increaseScore'})
                return gig;
            } catch (err) {
                console.log('gigStore: Error in addGig', err)
                throw err
            }
        },
        // async addReview(context, { review }, { gigId }) {
        //     try {
        //         await gigService.addReview(gigId, review)
        //         // context.commit({ type: 'addReview', review })
        //         // return gig;
        //     } catch (err) {
        //         console.log('gigStore: Error in addGig', err)
        //         throw err
        //     }
        // },
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
                console.log('gigStore: Error in removeGig', err)
                throw err
            }
        },

    }
}