const User = {
  type: "object",
  properties: {
    id: { type: "int" },
    profile_picture: { type: "string" },
    name: { type: "string", length: 256 },
    email: { type: "string", length: 256 },
    phone: { type: "string", length: 13 },
    cellphone: { type: "string", length: 15 },
    password: { type: "string", length: 256 },
  },
};

const getUserOptions = {
  body: {
    type: "object",
    required: ["nome", "profile_picture"],
    properties: {
      profile_picture: { type: "object" },
      name: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      email: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
    },
  },
  response: {
    200: {
      type: "array",
      items: {
        User,
      },
    },
  },
};

export { getUserOptions, User };
