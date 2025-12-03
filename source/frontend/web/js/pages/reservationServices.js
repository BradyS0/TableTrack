import { getUserState } from "../utils.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getUserReservations() {
    const user = getUserState();
    if (!user) throw new Error("Not logged in");

    const res = await fetch(`${API_URL}/v1/reservation/user/${user.userID}`);
    if (!res.ok) throw new Error("Failed to fetch user reservations");

    const data = await res.json();
    return data.reservations || [];
}

export async function getRestaurantReservations() {
    const user = getUserState();
    if (!user?.restID) throw new Error("Not a manager");

    const res = await fetch(`${API_URL}/v1/reservation/restaurant/${user.restID}`);
    if (!res.ok) throw new Error("Failed to fetch restaurant reservations");

    const data = await res.json();
    return data.reservations || [];
}
