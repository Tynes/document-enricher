/*
simple query class to model the elasticsearch DSL
I imagine it being more built out with subclasses
depending on the type of query and with error checking
*/

module.exports = class Query {
  constructor(index, type) {
    this.index = index;
    this.type = type;
    this.body = {};
  }
  addQuery() {
    this.body.query = {};
  }
  withQueryMatch(match) {
    this.body.query.match = match;
  }
  withQueryString(query, fields = []) {
    this.body.query.query_string = {
      query,
      fields
    }
  }
}
