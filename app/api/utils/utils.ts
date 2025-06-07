"server only";

export const fetchJson = async <T>(url: string): Promise<T> => {
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!result.ok) {
    throw new Error(`Fetch error [${result.status}]: ${result.statusText}`);
  }

  return result.json();
};
