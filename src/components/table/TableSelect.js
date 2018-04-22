import React from 'react';
import './table-select.css';

const TableSelect = (props) => {
  
  console.log(props);

  this.handleTableChange = (event) => {
    console.log(event.target.value);
  };
  
  return <div className="page table">
    <form id="tableForm" className="form">
      <label htmlFor="tableSelect">Selecione a mesa</label>
      <select className="table-select" name="tableSelect" id="tableSelect" onChange={ this.handleTableChange }>
        { props.tables.map((table, i) => {
          console.log(table);
          return (!table.done) ? <option key={i} value={i}>{table.id}</option> : null;
        })}
      </select>
      <a href="./payment/0">proximo</a>
      <input type="button" value="Selecionar" />
    </form>
  </div>;
};

export {
  TableSelect,
};