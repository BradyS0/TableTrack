const BASE = "http://localhost:3000/v1/menu";

export const menusAPI = {
  async getMenuItems(restID) {
    const res = await fetch(`${BASE}/${restID}`);
    const data = await res.json();

    return {
      code: res.status,
      data: data.menu || []
    };
  },

  async addMenuItem(restID, userID, item) {
    const res = await fetch(`${BASE}/${restID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });

    const data = await res.json();
    return { code: res.status, ...data };
  },

  async deleteMenuItem(restID, userID, itemID) {
    const res = await fetch(`${BASE}/${restID}/${itemID}`, {
      method: "DELETE"
    });

    const data = await res.json().catch(() => ({}));
    return { code: res.status, ...data };
  }
};
