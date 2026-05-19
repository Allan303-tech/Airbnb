
import express from 'express'
import {PORT, MDBURI} from './config.js'  
import {listings} from './listings.js'
import {details} from './details.js'
import {search} from './search.js'    


const app = express()   

app.listen(PORT, () => {
    console.log(`App is listening on port http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
  res.send('Welcome to  Allan\'s Airbnb')
})


app.get('/listings/:page', (req,res) => {
    const page = parseInt(req.params.page) || 1
    const perPage = 17
    const skip = (page - 1) * perPage
    listings(res, skip, perPage)
})

app.get('/details/:id', (req,res) => {
    const id = req.params.id
    details(res, id)
})

app.get('/search/:query', (req,res) => {
    const query = req.params.query
    search(res, query)
})  