import React from "react";
import './ingridient-details.scss';
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";



function IngridientDetails({active, setActive, name, image, proteins, fat, carbohydrates, calories}){

  return(
    <>
    <Modal active={active} setActive={setActive} header={'Детали ингредиента'}>
        <div className=" mb-15 ingridient-details__main">
          <img src={image} alt="" />
          <h4 className='mt-2 text text_type_main-medium'>{name}</h4>
          <ul className="mt-8">
            <li className=""><p className="text text_type_main-default">Калории,ккал</p> <p className="text text_type_digits-default">{calories}</p></li>
            <li className="ml-5"><p className="text text_type_main-default">Белки, г</p> <p className="text text_type_digits-default">{proteins}</p></li>
            <li className="ml-5"><p className="text text_type_main-default">Жиры, г</p><p className="text text_type_digits-default">{fat}</p></li>
            <li className="ml-5"><p className="text text_type_main-default">Углеводы, г</p><p className="text text_type_digits-default">{carbohydrates}</p></li>
        </ul>
      </div>
      </Modal>
    </>
  );
}

export default IngridientDetails;