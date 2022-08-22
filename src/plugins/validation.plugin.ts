const objectId = (value: string, h: { message: (arg0: any) => any }) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return h.message('"{{#label}}" must be a valid mongo ObjectId');
  }
  return value;
};

export { objectId };
