import { useEffect } from "react";

/**
 *
 *Компонент принимает две функции.
 * Эти функции помещены в useEffect для контроля изменений при их вызове.
 * Это значит , что если функция не была изменена(мемоизирована), то ее вызов не будет
 * происходит в этом компоненте
 */

export default function Child({ updateOne, updateTwo }) {
  useEffect(() => {
    updateOne();
  }, [updateOne]);

  useEffect(() => {
    updateTwo();
  }, [updateTwo]);

  return <div className="child" />;
}
