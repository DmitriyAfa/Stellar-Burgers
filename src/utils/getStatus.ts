export   const getStatus = (status: string): string => {
  return status === 'created' ? 'Создан' 
  : status === 'pending' ? 'Готовится' 
  : status === 'done' ? "Выполнен" : '';
};