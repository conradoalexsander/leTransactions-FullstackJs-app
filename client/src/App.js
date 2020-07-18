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


  const [modalIsOpen, setIsOpen] = useState(false);
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
    console.log(event.target.value);
    setSelectedDate(event.target.value)
  }

  const getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setMonth(dt.getMonth() + 1)) {

      arr.push(new Date(dt));
    }
    return arr;
  };


  useEffect(() => {
    const todayDate = new Date();

    const last12Months = getDaysArray(new Date(todayDate.getFullYear() - 1, 0, 1), todayDate);
    let next12Months = getDaysArray(todayDate, new Date(todayDate.getFullYear() + 1, 11, 31));

    next12Months = next12Months.slice(1);

    setDateOptions([...last12Months, ...next12Months]);


  }, [])

  useEffect(() => {
    api.get('/', { params: { period: selectedDate } }).then(response => {

      setTransactionsData(response.data);

    });


  }, [selectedDate]);


  return (
    <div className="container" >

      <h2 className="center-align">Controle Financeiro Pessoal</h2>
      <div>

      </div>
      <div className="input-field col s12">
        <select className="browser-default" onChange={handleDateSelection}>
          <option value="" defaultValue>Choose your option</option>
          {dateOptions.map(date => (

            <option
              key={date}
              value={date.toLocaleString('fr-CA', { year: 'numeric', month: "2-digit" })}
            >

              {`${formatMonth(date.toLocaleString('pt-BR', { month: 'short' }))}/${date.getFullYear()}`}

            </option>))}

        </select>
        <button className="btn waves-effect waves-light" onClick={openModal}>Open Modal</button>
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

            />)
        })
      }


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CreateEditForm onClick={closeModal} />
      </Modal>
    </div >
  )
}
