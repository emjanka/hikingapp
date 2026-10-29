const STORAGE_KEY = "savedItems";

export function getSavedItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getSavedIds(type) {
  return getSavedItems()
    .filter((item) => item.type === type)
    .map((item) => item.id);
}

export function isSaved(type, id) {
  return getSavedItems().some((item) => item.type === type && item.id === id);
}

export function toggleSaved(type, id) {
  const items = getSavedItems();
  const exists = items.some((item) => item.type === type && item.id === id);
  const updated = exists
    ? items.filter((item) => !(item.type === type && item.id === id))
    : [...items, { type, id }];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return !exists;
}