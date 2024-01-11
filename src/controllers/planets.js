"use strict"

const axios = require('axios')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Planets"]
            #swagger.summary = "List Planets"
            
        */
           
            const {data} = await axios(`https://swapi.dev/api/planets/?page=${req.query.page}`) 
           
            res.status(200).send({
                error: false,
                data
            
            })
       
    },

  

    read: async (req, res) => {
        /*
            #swagger.tags = ["Planets"]
            #swagger.summary = "Get Single Planet"
        */

        const {data} = await axios(`https://swapi.dev/api/planets/${req.params.id}/ `)

        res.status(200).send({
            error: false,
            data
        })
    },
}