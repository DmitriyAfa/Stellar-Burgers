export function setLocalStorageWithExpiry(key: string, value: string, ttl: number) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + (ttl * 1000 * 60),
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function deleteLocalStorageWithExpiry(key: string) {
  localStorage.removeItem(key);
}

export function getLocalStorageWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();

  // compare the expiry time of the item with the current time
  if (now.getTime() > parseInt(item.expiry)) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);

    return null;
  }
  return item.value;
}
