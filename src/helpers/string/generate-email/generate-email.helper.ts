const generateEmail = (): string => {
  return `${Math.random().toString(36).split('.').pop()}test@gmail.com`;
};

export { generateEmail };
