"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/people:

const {isAdmin} = require('../middlewares/permissions')
const people = require('../controllers/people')

// URL: /people

router.route('/')
    .get(people.list)

router.route('/:id')
    .get(people.read)

/* ------------------------------------------------------- */
module.exports = router