module.exports = {
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      userId: {
        type: "string",
      },
      name: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      address: {
        type: "string",
      },
      address2: {
        type: "string",
      },
      city: {
        type: "string",
      },
      state: {
        type: "string",
      },
      zipcode: {
        type: "string",
      },
    },
    required: ["userId", "name", "phone", "address", "city", "state", "zipcode"],
    additionalProperties: false,
  };