const API_URL = __API_URL__;
const API = `${API_URL}/v1/menu`;

export const menusAPI = {
  async getMenuItems(restID) {
    const res = await fetch(`${API}/${restID}`);
    const data = await res.json();

    return {
      code: res.status,
      data: data.menu || []
    };
  },

  async addMenuItem(restID, userID, item) {
    const res = await fetch(`${API}/${restID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });

    const data = await res.json();
    return { code: res.status, ...data };
  },

  async deleteMenuItem(restID, userID, itemID) {
    const res = await fetch(`${API}/${restID}/${itemID}`, {
      method: "DELETE"
    });

    const data = await res.json().catch(() => ({}));
    return { code: res.status, ...data };
  }
};
