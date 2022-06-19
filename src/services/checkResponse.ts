export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Ошибка ${res.status}`);
  return res.json();
};
