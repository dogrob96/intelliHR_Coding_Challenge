const express = require('express');
const router = express.Router();
const { graphqlHTTP } = require('express-graphql');
const schema = require('../config/schema');
const auth = require('../config/auth')

router.post('/graphql', auth.required, graphqlHTTP({
    schema,
    graphql: true
}));

router.use('/api', require('./api'));


module.exports = router;