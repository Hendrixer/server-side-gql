const resolvers = {
  SearchType: {
    __resolveType: (obj) => {
      if (obj.species) {
        return 'Animal'
      }
      return 'Person'
    },
  },

  Person: {
    name: (person) => {
      return 22
    },
    pets: (person) => {
      return [{ species: 'cat', name: 'darrylk' }]
    },
  },
  Query: {
    search: () => {
      return [
        { name: 'Scott', id: 'asjflaskfj' },
        { name: 'Darryl', species: 'Big cat' },
      ]
    },
    me: () => {
      return 'me'
    },
    people: () => {
      return [{ id: 'sausflsdkj', name: 'henry', pets: [1] }]
    },
  },
}

export default resolvers
