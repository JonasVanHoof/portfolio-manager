export const isEmptyString = (stringValue) => {
  if (typeof stringValue !== 'string') {
    throw {
      message: 'Given value is not of type string',
    };
  }

  return stringValue.trim() == '';
};
