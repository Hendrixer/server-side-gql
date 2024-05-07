const schema = `#graphql

  type Animal {
    species: String!
    name: String!
  }

  type Person {
    name: String!
    id: ID!
    pets: [Animal]!
  }

  union SearchType = Animal | Person

  type Query {
    me: String!
    people: [Person!]!
    search: [SearchType]!
  }
`

export default schema
