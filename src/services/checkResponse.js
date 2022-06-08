export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Ошибка ${res.status}`);
};
