
export default {
  200: {
    type: "object",
    properties: {
      code: {
        type: "number",
      },
      payload: {
        type: "array",
      },
      error: {
        type: "boolean",
      },
    },
  },
  400: {
    type: "object",
    properties: {
      code: {
        type: "number",
      },
      message: {
        type: "string",
      },
      error: {
        type: "boolean",
        default: false,
      },
    },
  },
}
