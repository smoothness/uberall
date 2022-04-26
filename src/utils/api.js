const PUBLIC_KEY =
  'GNpPyrkYiTS5BV4F8XckW3kYurprwSk7cRG3Z4jOtrTTBceyfPveAOvDFk3mYY0ofundf'
const API_URL = 'https://sandbox.uberall.com/api/search'
const headers = {
  'Content-Type': 'application/json',
  publicKey: PUBLIC_KEY,
}

export const API = {
  async search(body) {
    return await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }).then((data) => data.json())
  },
}
