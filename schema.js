const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql')
const axios = require('axios')

const baseUrl = 'https://api.spacexdata.com/v3'

const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
})

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      async resolve (parent, args) {
        const { data } = await axios.get(`${baseUrl}/launches`)
        return data
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      async resolve (parent, args) {
        const { data } = await axios.get(`${baseUrl}/launches/${args.flight_number}`)
        return data
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      async resolve (parent, args) {
        const { data } = await axios.get(`${baseUrl}/rockets`)
        return data
      }
    },
    rocket: {
      type: RocketType,
      args: {
        rocket_id: { type: GraphQLString }
      },
      async resolve (parent, args) {
        const { data } = await axios.get(`${baseUrl}/rockets/${args.rocket_id}`)
        return data
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
