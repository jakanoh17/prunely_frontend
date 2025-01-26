export default class AuthorizationApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _requestTemplate(endpoint, method, body) {
    return fetch(this.baseUrl + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Error: ${res.status}`);
    });
  }

  loginUser({ email, password }) {
    return this._requestTemplate("/login", "POST", { email, password });
  }

  registerUser({ email, password, username, avatar }) {
    return this._requestTemplate("/signup", "POST", {
      email,
      password,
      username,
      avatar,
    });
  }
}
