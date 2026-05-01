const BASE_URL = "http://localhost:5000/api";

export async function checkHesitation(payload: any) {
  try {
    const res = await fetch(`${BASE_URL}/trigger/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    return { success: false, error: "Backend not running" };
  }
}

export async function getRecoveryPlan(payload: any) {
  try {
    const res = await fetch(`${BASE_URL}/recovery/plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    return { success: false, error: "Backend not running" };
  }
}