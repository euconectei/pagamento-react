import React, { Component } from 'react';
import './table-select.css';

class TableSelect extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedTable: 0,
    };

    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleTableSubmit = this.handleTableSubmit.bind(this);
  }

  handleTableChange = (event) => {
    console.log(event.target.value);
    this.setState({ selectedTable: event.target.value });
  };

  handleTableSubmit = (event) => {
    event.preventDefault();
    if (this.state.selectedTable) {
      window.location = `/payment/${ this.state.selectedTable }`;
    } else {
      alert('Selecione uma mesa!');
    }
  }
  
  render() {
    return <div className="page table">
      <form action={`payment/${this.state.selectedTable}`} id="tableForm" className="form" method="POST">
        <label htmlFor="tableSelect">Selecione a mesa</label>
        <select className="table-select" name="tableSelect" id="tableSelect" onChange={ this.handleTableChange } required>
          <option value="">Mesa</option>
          { Object.keys(this.props.tables).map((table, i) => {
            return (!table.done) ? <option key={i} value={table}>{table}</option> : null;
          })}
        </select>
        <input type="button" value="Selecionar" onClick={this.handleTableSubmit} />
      </form>
    </div>;
  }
};

export {
  TableSelect,
};