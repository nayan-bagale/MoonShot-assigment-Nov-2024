export const generateShareableURL = (filters: any) => {
  const baseUrl = window.location.origin + window.location.pathname;
  const urlObj: any = {};
  if (filters.ageGroup) urlObj.ageGroup = filters.ageGroup;
  if (filters.gender) urlObj.gender = filters.gender;
  if (filters.dateRange?.start)
    urlObj.startDate = filters.dateRange?.start.split("T")[0];
  if (filters.dateRange?.end)
    urlObj.endDate = filters.dateRange?.end.split("T")[0];
  const query = new URLSearchParams(urlObj);
  return `${baseUrl}?${query.toString()}`;
};
