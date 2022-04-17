import React from "react";
import './modal.scss';
import {CloseIcon} from  '@ya.praktikum/react-developer-burger-ui-components';
const Modal = ({active, setActive, name, image, proteins, fat, carbohydrates, calories}) => {
  // active - отвечает за то видна компонента или нет.
  // setActive - функция которая изменяет состояние setActive
  return(
    <section className={`modal ${active ? "modal_active" : ""}`}>
      <div className="modal__content"> 
        <div className="mt-10 mr-10 ml-10 modal__header">
          <h2 className='text text_type_main-large'>Детали ингридиента</h2>
          <button onClick={() => setActive(false)}><CloseIcon type="primary" /></button>
        </div>
        <div className=" mb-15 modal__main">
          <img src={image} alt="" />
          <h4 className='mt-2 text text_type_main-medium'>{name}</h4>
          <ul className="mt-8">
            <li className=""><p className="text text_type_main-default">Калории,ккал</p> <p className="text text_type_digits-default">{calories}</p></li>
            <li className="ml-5"><p className="text text_type_main-default">Белки, г</p> <p className="text text_type_digits-default">{proteins}</p></li>
            <li className="ml-5"><p className="text text_type_main-default">Жиры, г</p><p className="text text_type_digits-default">{fat}</p></li>
            <li className="ml-5"><p className="text text_type_main-default">Углеводы, г</p><p className="text text_type_digits-default">{carbohydrates}</p></li>
          </ul> 
      </div>
      </div>
    </section>
  );
}


// class Modal extends React.Component {
//   constructor(props){
//     super(props);

//     this.state={
//       isActive: true
//     }
//   }

//   setActive = () => {
//     // return(console.log('hi'))
//     this.setState({
//       active: false
//     })
//   }
//   // active - отвечает за то видна компонента или нет.
//   // setActive - функция которая изменяет состояние setActive
//   render(){
//     return(
//       <section className={`modal ${this.props.active ? "modal_active" : ""}`}>
//         <div className="modal__content" onClick={e => e.stopPropagation()}> 
//           <div className="mt-10 mr-10 ml-10 modal__header">
//             <h2 className='text text_type_main-large'>Детали ингридиента</h2>
//             <button onClick={this.setActive}><CloseIcon type="primary" /></button>
//           </div>
//           <div className=" mb-15 modal__main">
//             <img src="https://code.s3.yandex.net/react/code/meat-01-large.png" alt="" />
//             <h4 className='mt-2 text text_type_main-medium'>Биокотлета из марсианской Магнолии</h4>
//             <ul className="mt-8">
//               <li className=""><p className="text text_type_main-default">Калории,ккал</p> <p className="text text_type_digits-default">244,4</p></li>
//               <li className="ml-5"><p className="text text_type_main-default">Белки, г</p> <p className="text text_type_digits-default">12,2</p></li>
//               <li className="ml-5"><p className="text text_type_main-default">Жиры, г</p><p className="text text_type_digits-default">17, 2</p></li>
//               <li className="ml-5"><p className="text text_type_main-default">Углеводы, г</p><p className="text text_type_digits-default">10,2</p></li>
//             </ul> 
//         </div>
//         </div>
//       </section>
//     );
//   }
// }
export default Modal;