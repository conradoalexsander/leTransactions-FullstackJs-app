import React, { useState, useEffect } from 'react'
import api from '../../services/api';

const style = {
  income: {
    color: 'teal',
    fontWeight: 'bold'
  },
  dispense: {
    color: 'red',
    fontWeight: 'bold'
  }
}

export default function CreateEditForm({
  _id,
  originalType,
  originalDescription,
  originalValue,
  originalCategory,
  originalDate,

  closeModal,
  setRefreshData,
  setSelectedDate,
  isEditing }) {
  const [selectedType, setSelectedtype] = useState(isEditing ? originalType : '');
  const [isIncome, setIsIncome] = useState();
  const [isDispense, setIsDispense] = useState();

  const [formData, setFormData] = useState({
    description: isEditing ? originalDescription : '',
    value: isEditing ? originalValue : '',
    category: isEditing ? originalCategory : '',
    date: isEditing ? originalDate : ''
  });

  useEffect(() => {
    console.log(isEditing);
    if (isEditing) {
      if (originalType === '+') {
        setIsIncome(true);
      } else if (originalType === '-') {
        setIsDispense(true);
      }
    } else {
      setIsIncome(false);
      setIsDispense(false);

    }
  }, [isEditing, originalType])



  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectedType(event) {
    const { value } = event.target;
    setSelectedtype(value);
  }

  function refreshData(data) {
    const today = new Date().toLocaleString('fr-CA', { year: 'numeric', month: "2-digit" })
    if (data.yearMonth === today) {
      setRefreshData(new Date());
    } else {
      setSelectedDate(data.yearMonth)
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const {
        description,
        value,
        category,

      } = formData;

      let { date } = formData

      date = date.split('-');

      const [year, month, day] = date;

      const data = {
        description,
        value,
        category,
        year,
        month,
        day,
        yearMonth: `${year}-${month}`,
        yearMonthDay: `${year}-${month}-${day}`,
        type: selectedType,
      }



      if (isEditing) {
        await api.put(`/${_id}`, data);
        alert('Transação atualizada com sucesso!')

      } else {
        await api.post('/', data);
        alert('Transação criada com sucesso!');
      }
      closeModal();
      refreshData(data);

    } catch (error) {
      console.log(error)
    }


  }


  return (
    <>
      <div className="col s12 center-align">
        <div className="row">
          <div className="col s8 left-align">
            <h6>Inclusão de lançamento</h6>
          </div>
          <div className="col s4 right-align">
            <button className="btn waves-effect red" onClick={closeModal}>
              X
            </button>
          </div>
        </div>

        <div className="center-align">
          <form className="col s12" onSubmit={handleSubmit} action="#">

            <div className="row center-align">
              <label>
                <input name="type" style={style.income} type="radio" value="+" onChange={handleSelectedType} defaultChecked={isIncome} required disabled={isEditing} />
                <span>Receita</span>
              </label>
              <label>
                <input name="type" style={style.dispense} type="radio" value="-" onChange={handleSelectedType} defaultChecked={isDispense} disabled={isEditing} />
                <span>Despesa</span>
              </label>
            </div>

            <div className="row left-align">
              <div className="col s12">
                <label htmlFor="descricao">
                  Descrição
                  </label>
                <input name="description" defaultValue={originalDescription} id="description" type="text" className="validate" onChange={handleInputChange} required />
              </div>
            </div>

            <div className="row left-align">
              <div className="col s12">
                <label htmlFor="category">
                  Categoria
                  </label>
                <input name="category" defaultValue={originalCategory} id="category" type="text" className="validate" onChange={handleInputChange} required />
              </div>
            </div>

            <div className="row left-align my-wrapper valign-wrapper">
              <div className="col s6">
                <label htmlFor="valor">
                  Valor
                  </label>
                <input name="value" defaultValue={originalValue} id="value" type="number" className="validate" onChange={handleInputChange} required />
              </div>

              <div className="col s6 ">
                <input name="date" defaultValue={originalDate} type="date" className="browser-default" onChange={handleInputChange} required />
              </div>
            </div>

            <button className="btn waves-effect waves-light" type="submit">Salvar</button>
          </form>

        </div>


      </div>
    </>
  )
}
