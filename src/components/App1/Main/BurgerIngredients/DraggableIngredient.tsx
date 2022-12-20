import React from "react";

import { useDrag } from "react-dnd";

// Types
import { IIngredientType } from "../../../../services/types";

interface IDraggabelIngredientComponent {
  children: React.ReactNode;
  ingredientData: IIngredientType;
  className: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const DraggableIngredient: React.FunctionComponent<IDraggabelIngredientComponent> =
  React.memo(({ children, ingredientData, className, onClick }) => {
    const [{ isDrag }, ref] = useDrag({
      type: "ingredient",
      item: { id: ingredientData._id },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    });

    return (
      <li
        ref={ref}
        data-id={ingredientData._id}
        className={className}
        onClick={onClick}
      >
        {children}
      </li>
    );
  });

export default DraggableIngredient;
