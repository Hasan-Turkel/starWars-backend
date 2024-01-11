"use strict"

const axios = require('axios')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["People"]
            #swagger.summary = "List People"
            
        */
           
            const {data} = await axios(`https://swapi.dev/api/people/?page=${req.query.page}`) 
           
            res.status(200).send({
                error: false,
                data
            
            })
       
    },

  

    read: async (req, res) => {
        /*
            #swagger.tags = ["People"]
            #swagger.summary = "Get Single People"
        */

        const {data} = await axios(`https://swapi.dev/api/people/${req.params.id}/ `)

        res.status(200).send({
            error: false,
            data
        })
    },
}