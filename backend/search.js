import { listingsCollection } from './myMongo.js';


const search = (res, query) => {

    if (!isNaN(query)) {

        const nights = Number(query)

        listingsCollection
            .find({
                 accommodates: { $gte: nights }
                 })
            .project({
                _id: 1,
                name: 1,
                summary: 1,
                address: 1,
                property_type: 1,
                review_scores: { review_scores_rating: 1 },
                price: 1,
            })
            .toArray()
            .then(resp => {
                if (!resp) {
                    res.status(404).json({ "error": "No search results found" })
                    return
                }
                for (let doc of resp) {
                    if (doc.price) {
                        doc.price = `US$${parseFloat(doc.price).toFixed(2)}`
                    }
                }
            })
    } else {

        listingsCollection
            .find({ property_type: query })
            .project({
                _id: 1,
                name: 1,
                summary: 1,
                address: 1,
                property_type: 1,
                review_scores: { review_scores_rating: 1 },
                price: 1,
            })
            .toArray()
            .then(resp => {
                if (!resp) {
                    res.status(404).json({ "error": "No search results found" })
                    return
                }
                for (let doc of resp) {
                    if (doc.price) {
                        doc.price = `US$${parseFloat(doc.price).toFixed(2)}`
                    }
                }


                res.status(200).json(resp)
            })

    }
}

export { search }