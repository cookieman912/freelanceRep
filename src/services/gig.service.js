import { storageService } from './async-storage.service.js'
// import { utilService } from './util-service.js'
// import { httpService } from './http-service.js'
// import axios from 'axios'


const GIGKEY = "gigsDB"
export const gigService = {
    query,
    getById,
    remove,
    save,
    getEmptyReview,
}

const defaultGigs = [{
    _id: "g101",
    title: "logo",
    imgUrls: [
        "img1.jpg"
    ],
    pride: 100,
    deliveryDays: 4,
    description: "some description for the logo gig",
    tags: [
        "graphic",
        "website"
    ],
    seller: {
        _id: "u101",
        fullname: "Yori Yorovich",
        imgUrl: "img.jpg"
    },
    reviews: [{
            id: 'r101',
            txt: 'wowowowowo',
            rate: 5
        },
        {
            id: 'r102',
            txt: "the best logo ever",
            rate: 5,
            by: {
                fullname: "puki puki"
            }
        }
    ]
}]



function query() {

    // return httpService.get('gig', filterBy)

    return storageService.query(GIGKEY)
        .then(gigs => {
            if (gigs && gigs.length !== 0) {

                console.log('in conditon')
                return gigs;
            } else {
                storageService.postMany(GIGKEY, defaultGigs)
                return defaultGigs
            }
        })

}

function getById(gigId) {
    console.log(gigId)
        // return httpService.get(`gig/${gigId}`)
    return storageService.get(GIGKEY, gigId)
        .then(gig => {
            console.log(gig);
            return gig
        })
}

function remove(gigId) {
    // return httpService.delete(`gig/${gigId}`)
    return storageService.remove(GIGKEY, gigId)
        .then(gigs => { console.log(gigs) })
}


function save(gig) {
    // console.log(toy);
    console.log(gig);
    if (gig._id) {
        return storageService.put(GIGKEY, gig)
            .then(gig => { return gig })
            // return httpService.put(`gig`, gig)
    } else {

        return storageService.post(GIGKEY, gig)
            .then(gig => { return gig })
            // return httpService.post(`gig`, gig)
    }
}

function getEmptyReview() {
    return {
        id: utilService.makeId(),
        txt: '',
        at: Date.now()
    }
}