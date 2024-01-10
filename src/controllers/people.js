"use strict"

const axios = require('axios')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            
        */
           
            const {data} = await axios(`https://swapi.dev/api/people/?page=${req.query.page}`) 
           
            res.status(200).send({
                error: false,
                data
            
            })
       

        // FOR REACT PROJECT:
        // res.status(200).send(data)
    },

  

    read: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

        const {data} = await axios(`https://swapi.dev/api/people/${req.params.id}/ `)

        res.status(200).send({
            error: false,
            data
        })
    },
}