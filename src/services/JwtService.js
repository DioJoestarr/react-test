

const accessTokenName = "x-access-token";

function clearTokens() {
  localStorage.removeItem(accessTokenName)

}

function setToken(token) {
  if (token) localStorage.setItem(accessTokenName,token)
}

function getAccessToken() {
  return localStorage.getItem(accessTokenName);
}

export default {
    getAccessToken,
    setToken,clearTokens
};
