export const userUserInfo = (): string[] => {
  const { email, username, token } = JSON.parse(localStorage.getItem("user")!);

  return [email, username, token];
};
