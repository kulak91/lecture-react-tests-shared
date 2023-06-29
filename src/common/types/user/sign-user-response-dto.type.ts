type SignUserResponseDto = {
  token: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
};

export { SignUserResponseDto };
