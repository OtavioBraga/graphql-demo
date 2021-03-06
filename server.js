const express = require('express')
const graphqlHttp = require('express-graphql')
const schema = require('./schema')

const app = express()

app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true
}))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started at ${PORT}`))
