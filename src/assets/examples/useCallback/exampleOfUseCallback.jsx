import { useState, useCallback } from "react";
import Child from "./Child";

/**
 *
 * Есть два счётчика созданных с помощью useState.
 * Есть две кнопки, при клике на них них будут вызываться функции для изменения счетчиков.
 * Функции передаются в дочернему компоненту Child.
 * Функции вызывают console.log. Их единственно различие в том, что одна из
 * них будет обернута хуком useCallback и иметь в зависимости состояние
 * первого счетчика.
 *
 * Когда будет вызвана функция updateOne, то в консоле появятся оба сообщения.
 * А когда будет вызвана функция updateTwo, то в консоле появится только сообшение
 * "Я не мемоизирован".
 * Так произойдет потому что в зависимостях передано значение counter и useCallback
 * отслеживает его изменения. И только в ответ на изменение counter функция
 * которая была создана с помощью useCallback обновится, в противном случае она
 * будет использовать кэшированную версию функции.
 *
 * ВЫВОД: useCallback похожа на useMemo с тем отличием, что он возвращает мемоизированный
 * колбэк, который будет обновлен, только если одна из зависимостей будет изменена.
 */

export function exampleOfUseCallback() {
  const [counter, setCounter] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  const updateOne = () => {
    console.log("Я не мемоизирован");
  };

  const updateTwo = useCallback(() => {
    console.log("Я мемоизирован!");
  }, [counter]);

  return (
    <div className="App">
      <button onClick={() => setCounter(counter + 1)}>One: {counter}</button>
      <br />
      <button onClick={() => setCounterTwo(counterTwo + 1)}>
        Two: {counterTwo}
      </button>
      <Child updateOne={updateOne} updateTwo={updateTwo} />
    </div>
  );
}
