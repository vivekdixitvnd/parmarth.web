import backendUrl from "../backendUrl";

let orgDataCache = null;

export const fetchOrganizationData = async () => {
  if (orgDataCache) return orgDataCache;
  const res = await fetch(`${backendUrl}/organization`);
  if (!res.ok) throw new Error("Failed to fetch organization data");
  orgDataCache = await res.json();
  return orgDataCache;
};

export const clearOrgCache = () => {
  orgDataCache = null;
};
