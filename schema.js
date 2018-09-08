const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

//HardCoded data
const customers = [
  { id:'1', name: 'Johan', email: 'johan@email.com', age: 37 },
  { id:'2', name: 'Gary', email: 'Gary@email.com', age: 28 },
  { id:'3', name: 'Ismail', email: 'Ismail@email.com', age: 22 },
]

//Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt},
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    customer: {
      type: CustomerType,
      args: {
        id: {type: GraphQLString},
      },
      resolve(parentValue, args){
        for(let i = 0; i < customer.length; i++){
          if(customer[i].id== args.id){
            return customer[i];
          }
        }
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args){
        return customers;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});