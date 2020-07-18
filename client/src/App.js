import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionCard from './components/TransactionCard';
import CreateEditForm from '../src/components/CreateEditForm';
import api from './services/api';
import Modal from 'react-modal';

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


export default function App() {
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [transactionsData, setTransactionsData] = useState([]);
  const [refreshData, setRefreshData] = useState('')



  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const todayDate = new Date();

    const last12Months = getDaysArray(new Date(todayDate.getFullYear() - 1, 0, 1), todayDate);
    let next12Months = getDaysArray(todayDate, new Date(todayDate.getFullYear() + 1, 11, 31));

    next12Months = next12Months.slice(1);

    setDateOptions([...last12Months, ...next12Months]);


  }, [])

  useEffect(() => {
    console.log(selectedDate)
    api.get('/', { params: { period: selectedDate } }).then(response => {

      setTransactionsData(response.data);

    });


  }, [selectedDate, refreshData]);

  useEffect(() => {
    const today = new Date().toLocaleString('fr-CA', { year: 'numeric', month: "2-digit" })
    setSelectedDate(today);
  }, []);


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function removeLastChar(str) {
    return str.substring(0, str.length - 1);
  }

  function formatMonth(date) {
    date = capitalize(date);
    date = removeLastChar(date);
    return date;
  }

  function handleDateSelection(event) {

    setSelectedDate(event.target.value)
  }

  const getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setMonth(dt.getMonth() + 1)) {

      arr.push(new Date(dt));
    }
    return arr;
  };





  return (
    <div className="container" >

      <h2 className="center-align">Controle Financeiro Pessoal</h2>
      <div>

      </div>
      <div className="row">
        <div className="col s12">
          <div className="input-field center-align col s4 offset-s4">
            <select value={selectedDate} className="browser-default" onChange={handleDateSelection}>

              {dateOptions.map(date => (

                <option
                  key={date}
                  value={date.toLocaleString('fr-CA', { year: 'numeric', month: "2-digit" })}
                >

                  {`${formatMonth(date.toLocaleString('pt-BR', { month: 'short' }))}/${date.getFullYear()}`}

                </option>))}

            </select>

          </div>

        </div>

      </div>
      <div className="row my-wrapper valign-wrapper">
        <button className="btn waves-effect waves-light" onClick={openModal}>+ NOVO LANÇAMENTO</button>
        <div className="col s9">
          <label htmlFor="filtro">Filtro</label>
          <input placeholder="filtre os resultados pela sua descrição" name="filtro" id="filtro" type="text" className="validate" />
        </div>
      </div>

      {transactionsData &&
        transactionsData.map((transaction, index) => {
          const {
            category,
            day,
            description,
            month,
            type,
            value,
            year,
            yearMonth,
            yearMonthDay,
            _id } = transaction;
          return (
            <TransactionCard
              key={index}
              position={index + 1}
              category={category}
              day={day}
              description={description}
              month={month}
              type={type}
              value={value}
              year={year}
              yearMonth={yearMonth}
              yearMonthDay={yearMonthDay}
              _id={_id}

              setSelectedDate={(period) => setSelectedDate(period)}
              setRefreshData={(period) => setRefreshData(period)}

            />)
        })
      }


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}

        contentLabel="Example Modal"
      >
        <CreateEditForm
          setSelectedDate={(period) => setSelectedDate(period)}
          setRefreshData={(period) => setRefreshData(period)}
          isEditing={false}
          closeModal={closeModal}
        />
      </Modal>
    </div >
  )
}
