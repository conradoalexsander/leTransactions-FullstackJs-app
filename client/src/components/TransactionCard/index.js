import React, { useState } from 'react'

import './style.css'

import Modal from 'react-modal';
import CreateEditForm from '../CreateEditForm';
import api from '../../services/api';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '80%'

  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function TransactionCard({
  _id,
  position,
  category,
  description,
  type,
  value,
  setSelectedDate,
  setRefreshData,
  yearMonthDay,
}) {

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }



  function closeModal() {
    setIsOpen(false);
  }

  async function handleDelete(_id) {
    try {
      await api.delete(`/${_id}`);
      alert('Transação excluída com exito!')
      setRefreshData(new Date());
    } catch (error) {
      console.log(error);

    }
  }


  const bgColor = type === "+" ? "green lighten-3" : "red lighten-3";

  function brlCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className={`card ${bgColor}`}>
      <div className="row my-wrapper valign-wrapper">

        <div className="col s1">
          <p className="position">
            {position.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}
          </p>
        </div>

        <div className="col s7 align-wrapper">
          <p className=" title">{category}</p>
          <p className=" description">{description}</p>

        </div>

        <div className="col s2 align-wrapper">
          <p className=" currency">{brlCurrency(value)}</p>
        </div>

        <div className="col s2 center-align align-wrapper">


          <i className="material-icons" onClick={openModal}>edit</i>

          <i className="material-icons" onClick={() => handleDelete(_id)}>delete</i>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CreateEditForm
          _id={_id}
          originalType={type}
          originalCategory={category}
          originalDescription={description}
          originalValue={value}
          originalDate={yearMonthDay}
          closeModal={closeModal}
          setSelectedDate={(period) => setSelectedDate(period)}
          setRefreshData={(period) => setRefreshData(period)}
          isEditing={true} />
      </Modal>
    </div>
  );



  // <div class="row">
  //   <div class="col s12">
  //     <div class={`card ${bgColor}`}>
  //       <div class="card-content ">
  //         <div class="col s2 ">

  //         </div>


  //         <div class="col s6 ">

  //         </div>
  //         <div class="col s2 ">

  //         </div>
  //         <div class="col s2 ">

  //         </div>
  //       </div>
  //     </div>
  //   </div>

}

export default TransactionCard;
