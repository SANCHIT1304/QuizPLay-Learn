const BASE_URL = "http://localhost:3000/api";

export const fetchAchievements = () =>
  fetch(`${BASE_URL}/achievements`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(res => res.json());

export const fetchRewards = () =>
  fetch(`${BASE_URL}/rewards`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(res => res.json());

export const redeemReward = (rewardId) =>
  fetch(`${BASE_URL}/rewards/redeem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ rewardId })
  }).then(res => {
    if (!res.ok) throw new Error("Failed to redeem reward");
    return res.json();
  });
