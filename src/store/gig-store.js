import { gigService } from '../services/gig.service.js'


export const gigStore = {
    state: {
        gigs: [],
        filterBy: {
            txt: '',
            price: {
                min: 0,
                max: 1000000
            },
            tags: '',
            rate: 0
        }
    },
    getters: {
        filterTxtToShow(state) {
            return state.filterBy.txt
        },
        filterToShow(state) {
            return state.filterBy
        },
        gigs(state) { return state.gigs },
        gigsToShow(state) {
            console.log('store gigs', state.gigs)
            console.log('filterBy', state.filterBy);
            // let gigsToShow = state.gigs
            let gigsToShow = state.gigs.filter(gig => (+gig.price >= +state.filterBy.price.min))
                .filter(gig => (+gig.price <= +state.filterBy.price.max))
                .filter(gig => gig.tags === state.filterBy.tags || state.filterBy.tags === '')
                .filter(gig => +gig.rate >= +state.filterBy.rate)
                                                    // || !state.filterBy.price.min || !state.filterBy.price.max)
            let regex = new RegExp(state.filterBy.txt, 'i')
            return gigsToShow.filter(gig => regex.test(gig.title) || regex.test(gig.description))
        },
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs;
        },
        addGig(state, { gig }) {

            state.gigs.push(gig)
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