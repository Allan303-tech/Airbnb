import {listingsCollection} from './myMongo.js';    

const details= (res, id) => {

    listingsCollection
    .findOne({
        _id: id},
        {
            projection: {
                listing_url: 1,
                name: 1,
                description: 1,
                address: 1,
                property_type: 1,
                room_type: 1,
                bedrooms: 1,
                beds: 1,
                amenities: 1,
                minimum_nights: 1,
                maximum_nights: 1,
                picture_url: 1,
                cancellation_policy: 1,
                host_name: 1,
                host_picture_url: 1,
                review_scores: 1,
                reviews: 1,                
            }
        }
    )
    .then(doc => {
        if (!doc) 
            doc = { "error": "no details found"}
        else {

            doc.number_of_nights =
            `Available for ${doc.minimum_nights} to ${doc.maximum_nights} nights.`

        }
        res.status(200).json(doc)

    })
}

export {details}