import jwt_decode from "jwt-decode";

export const getTokenPayload = () => {
  const cookies = document.cookie;
  if (!cookies) return null;
  let accessToken = cookies
    .split(";")
    .find((c) => c.trim().startsWith("access_token="));
  if (!accessToken) return null;
  accessToken = accessToken.split("=")[1];

  const payload = jwt_decode(accessToken);
  return payload;
};
