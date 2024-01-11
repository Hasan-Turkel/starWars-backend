"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/people:

const people = require('../controllers/people')

// URL: /people

router.route('/')
    .get(people.list)

router.route('/:id')
    .get(people.read)

/* ------------------------------------------------------- */
module.exports = router