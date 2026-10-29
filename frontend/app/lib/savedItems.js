// Saved items are stored in the browser so they stay after a refresh
const STORAGE_KEY = "savedItems";

// Gets the list of saved items
export function getSavedItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Gets the ids of one type, for example all saved blogs
export function getSavedIds(type) {
  return getSavedItems()
    .filter((item) => item.type === type)
    .map((item) => item.id);
}

// Checks if one item is saved
export function isSaved(type, id) {
  return getSavedItems().some((item) => item.type === type && item.id === id);
}

// Saves the item, or removes it if it is already saved
export function toggleSaved(type, id) {
  const items = getSavedItems();
  const exists = items.some((item) => item.type === type && item.id === id);
  const updated = exists
    ? items.filter((item) => !(item.type === type && item.id === id))
    : [...items, { type, id }];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return !exists;
}