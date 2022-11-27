// получаем координаты элемента в контексте документа
export default function getCoords(elem: HTMLElement, parent?: HTMLElement) : GetCoordsReturnType {
  const parentCoords : (HTMLElement | GetCoordsReturnType) = 
    parent ? getCoords(parent) : {top: 0, bottom: 0, left: 0, right: 0};

  const box : GetCoordsReturnType = elem.getBoundingClientRect();


  return {
    top: box.top + window.pageYOffset - parentCoords.top,
    left: box.left + window.pageXOffset - parentCoords.left,
    right: box.right + window.pageXOffset - parentCoords.right,
    bottom: box.bottom + window.pageYOffset - parentCoords.bottom,
  };
}



type GetCoordsReturnType = {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

