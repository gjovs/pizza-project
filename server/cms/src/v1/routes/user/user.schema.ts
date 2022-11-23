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
    isAdmin: { type: "boolean" },
  },
};

const getUserOptions = {
  body: {
    type: "object",
    required:['nome','avatar'],
    properties: {
      avatar: { type: "object" },
      nome: { type: "object" },
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
