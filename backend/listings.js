import {listingsCollection } from "./myMongo.js"

const listings = (res, skip = 0, perPage = 17) => {
    listingsCollection
        .find({}, {
            limit: perPage,
            skip: skip,
            sort: { number_of_reviews: -1 }

        })
        .project({
            _id: 1,
            listing_url: 1,
            accommodates: 1,
            number_of_reviews: 1,
            price: 1,
            summary: 1,
            review_scores: { review_scores_rating: 1 },
            host: {
                host_url: 1,
                host_picture_url: 1,
                host_name: 1,
                host_is_superhost: 1
            }
        })
        .toArray()
        .then(resp => {

            if (!resp) {
                res.status(404).json({ "error": "No listings found" })
                return
            }

                for (let doc of resp) {

                    if (doc.price) {
                        doc.price = `US$${parseFloat(doc.price).toFixed(2)}`
                    }

                    if (doc.host) {
                        if (doc.host.host_is_superhost)
                            doc.host_name = `${doc.host.host_name} is your super host`
                        else
                            doc.host_name = `${doc.host.host_name} is your host`

                    }
                }
            
            res.status(200).json(resp)

        })

}

export { listings }