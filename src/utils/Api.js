export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _requestTemplate(endpoint, method, token, body) {
    return fetch(this.baseUrl + endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserData(token) {
    return this._requestTemplate("/me", "GET", token);
  }

  saveStudySession(token, { sessionName, intervals, overallTime }) {
    return this._requestTemplate("/sessions", "POST", token, {
      sessionName,
      intervals,
      overallTime,
    });
  }

  getStudySessions(token) {
    return this._requestTemplate("/sessions", "GET", token);
  }

  createCustomerPortalSession(token, { customerId, returnUrl }) {
    return this._requestTemplate(
      "/create-customer-portal-session",
      "POST",
      token,
      {
        customerId,
        returnUrl,
      }
    );
  }

  fetchPlaylist(token) {
    return this._requestTemplate("/playlist", "GET", token);
  }

  savePlaylist(token, { adminId, admin, playlistId }) {
    return this._requestTemplate("/playlist", "POST", token, {
      adminId,
      admin,
      playlistId,
    });
  }
}
