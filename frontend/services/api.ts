const BASE_URL = "http://localhost:5000/api";

export async function checkHesitation(payload: any) {
  const res = await fetch(`${BASE_URL}/trigger/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function getRecoveryPlan(payload: any) {
  const res = await fetch(`${BASE_URL}/recovery/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
}