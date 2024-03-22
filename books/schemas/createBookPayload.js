// "ISBN": string,
//     "title": string,
//     "Author": string,
//     "description": string,
//     "genre": "string,
//     "price": decimal,
//     "quantity": int

module.exports = {
  type: "object",
  properties: {
    ISBN: {
      type: "string",
    },
    title: {
      type: "string",
    },
    Author: {
      type: "string",
    },
    description: {
      type: "string",
    },
    genre: {
      type: "string",
    },
    price: {
      type: "decimal",
    },
    quantity: {
      type: "number",
    },
  },
  required: ["ISBN", "title", "Author", "description", "genre", "price", "quantity"],
  additionalProperties: false,
};
