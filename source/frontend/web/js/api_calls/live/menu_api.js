import loader from "./loader";
const API_URL = __API_URL__;
const API = `${API_URL}/v1/menu`;

export const menusAPI = {
  async getMenuItems(restID) {
    loader.showLoading();
    const res = await fetch(`${API}/${restID}`);
    const data = await res.json();
    loader.hideLoading();
    return {
      code: res.status,
      data: data.menu || [],
    };
  },

  async addMenuItem(restID, userID, item) {
    loader.showLoading();
    const res = await fetch(`${API}/${restID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    loader.hideLoading();
    return { code: res.status, ...data };
  },

  async deleteMenuItem(restID, userID, itemID) {
    loader.showLoading();
    const res = await fetch(`${API}/${restID}/${itemID}`, {
      method: "DELETE",
    });

    const data = await res.json().catch(() => ({}));
    loader.hideLoading();
    return { code: res.status, ...data };
  },
};
