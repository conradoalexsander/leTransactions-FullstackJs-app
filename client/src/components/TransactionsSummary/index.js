import React from 'react';

// import { Container } from './styles';

const style = {
  row: {
    border: '1px solid #dee3e0',
    borderRadius: '7px'
  },

  titles: {
    fontWeight: 'bold'
  },
  numberOfTransactionsText: {
    fontWeight: '200'
  },
  income: {
    fontWeight: 'bold',
    color: 'teal'
  },
  dispense: {
    fontWeight: 'bold',
    color: 'red'
  },



}

function TransactionsSummary({ numberOfTransactions, totalIncome, totalDispense, balance }) {
  function brlCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  return (
    <div className="row" style={style.row}>
      <div className="col s12">
        <div className="col s3">
          <p style={style.titles}>Lançamentos:
          <span style={style.numberOfTransactionsText}>{numberOfTransactions}</span>
          </p>
        </div>
        <div className="col s3">
          <p style={style.titles}>Receitas:
          <span style={style.income}>{brlCurrency(totalIncome)}</span>
          </p>
        </div>
        <div className="col s3">
          <p style={style.titles}>Despesas:
          <span style={style.dispense}>{brlCurrency(totalDispense)}</span>
          </p>
        </div>
        <div className="col s3">
          <p style={style.titles}>Saldo:
          <span style={balance >= 0 ? style.income : style.dispense}>{brlCurrency(balance)}</span>
          </p>
        </div>
      </div>
    </div>

  );
}

export default TransactionsSummary;
