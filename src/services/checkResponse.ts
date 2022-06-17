export const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Ошибка ${res.status}`);
};
