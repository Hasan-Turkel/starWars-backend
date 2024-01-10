"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// URL: /

auth:
router.use('/users/auth', require('./auth'))

// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))
// planets:
router.use('/planets', require('./planets'))
// people:
router.use('/people', require('./people'))


// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router