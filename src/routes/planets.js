"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/planets:

const planets = require('../controllers/planets')

// URL: /planets

router.route('/')
    .get(planets.list)

router.route('/:id')
    .get(planets.read)

/* ------------------------------------------------------- */
module.exports = router