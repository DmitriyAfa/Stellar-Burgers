import formatRelative from "date-fns/formatRelative";
import  {ru}  from 'date-fns/locale';

export const getDate = (date: string) => {
  return formatRelative(new Date(date), new Date(), {locale: ru});
};