import { gigService } from '../services/gig.service.js';


export const gigStore = {
    state: {
        gigs: [],
        filterBy: {
            txt: '',
            price: {
                min: 0,
                max: Infinity
            },
            tags: [],
            rate: 0,
            sortBy: ''
        },
        addReview: {
            txt: '',
            by: {
                fullname: ''
            },
            rate: null
        }
    },
    getters: {
        // filterTxtToShow(state) {
        //     return state.filterBy.txt
        // },
        reviewToShow(state) {
            return state.addReview;
        },
        filterToShow(state) {
            return state.filterBy;
        },
        gigs(state) { return state.gigs; },

        topRatedGigsToShow(state) {
            let gigsToShow = state.gigs;
            let filtered = gigsToShow.filter(gig => {
                gig.reviews[0] >= 4.5;
            });
            return filtered;
        },


        businessGigsToShow(state) {
            let gigsToShow = state.gigs;
            let filtered = gigsToShow.filter(gig => {
                const { tags } = gig;
                return tags.find(tag => tag === 'Business plan');
            });
            return filtered;
        },


        webGigsToShow(state) {
            let gigsToShow = state.gigs;
            let filtered = gigsToShow.filter(gig => {
                const { tags } = gig;
                return tags.find(tag => tag === 'Web development');
            });
            return filtered;
        },

        gigsToShow(state) {
            let regex = new RegExp(state.filterBy.txt, 'i');
            let maxPrice = state.filterBy.price.max;
            if (!state.filterBy.price.max) maxPrice = Infinity;
            console.log('max price ', state.filterBy.price.max);
            let gigsToShow = state.gigs.filter(gig => (+gig.price >= +state.filterBy.price.min))
                .filter(gig => (+gig.price <= +maxPrice));
            let filtered = gigsToShow.filter(gig => regex.test(gig.title) || regex.test(gig.description));
            if (state.filterBy.rate) {
                filtered = filtered.filter(gig => +gig.rate >= +state.filterBy.rate);
            }
            if (state.filterBy.tags.length) {
                filtered = filtered.filter(gig => {
                    const { tags } = gig;
                    return tags.find(tag => tag === state.filterBy.tags);
                });
            }
            return filtered;
        },
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs;
        },
        addGig(state, { gig }) {
            // state.gigs.push(gig)
        },
        addReview(state, { review }) {
            state.gigs.push(gigs);
        },
        removeGig(state, { gigId }) {
            state.gigs = state.gigs.filter(gig => gig._id !== gigId);
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        setReview(state, { review }) {
            state.addReview = review;
        },
    },
    actions: {
        async addGig(context, { gig }) {
            try {
                gig = await gigService.save(gig);
                context.commit({ type: 'addGig', gig });

                return gig;
            } catch (err) {
                console.log('gigStore: Error in addGig', err);
                throw err;
            }
        },
        async addReview(context, { gigId }, { review }) {
            try {
                console.log(gigId);
                console.log(review);
                review = await gigService.addReview(gigId, review);
                context.commit({ type: 'addReview', review });
                return gig;
            } catch (err) {
                console.log('gigStore: Error in addReview', err);
                throw err;
            }
        },
        async loadGigs(context) {
            try {
                console.log('loadgigs(store)', context.state.filterBy);
                const gigs = await gigService.query(context.state.filterBy);
                context.commit({ type: 'setGigs', gigs });
                return gigs;
            } catch (err) {
                console.log('gigStore: Error in loadGigs', err);
                throw err;
            }
        },
        async removeGig(context, { gigId }) {
            try {
                await gigService.remove(gigId);
                context.commit({ type: 'removeGig', gigId });
            } catch (err) {
                console.log('gigStore: Error in removeGig', err);
                throw err;
            }
        },

    }
};