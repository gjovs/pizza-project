const createDrinkOptions = {
  body: {
    type: "object",
    required: ["price", "volume", "saleOffValue", "type", "picture", "name"],
    properties: {
      picture: { type: "object" },
      price: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      volume: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      name: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      saleOffValue: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      type: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
    },
  },
  // response: {
  //   200: {
  //     type: "object",
  //     properties: {
  //       statusCode: {
  //         type: "number",
  //       },
  //       payload: {
  //         type: "array",
  //         items: {
  //           ,
  //         },
  //       },
  //       error: {
  //         type: "boolean",
  //       },
  //     },
  //   },
};

export { createDrinkOptions };
