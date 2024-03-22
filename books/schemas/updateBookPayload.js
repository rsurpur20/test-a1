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
  additionalProperties: false,
};
