import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './table-select.css';

class TableSelect extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedTable: '',
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange(event) {

    this.setState({ selectedTable: event.target.value });
  };
  
  render() {
    return <div className="page tables">
      <form action={`payment/${this.state.selectedTable}`} id="tableForm" className="form">
        <label htmlFor="tableSelect">Selecione a mesa:</label>
        <select className="table-select" name="tableSelect" id="tableSelect" onChange={ this.handleTableChange } required>
          <option value="">Mesa</option>
          { Object.keys(this.props.tables).map((table, i) => {
            return (!table.done) ? <option key={i} value={table}>{table}</option> : null;
          })}
        </select>
        
      </form>
      <Link className="btn" to={{
        pathname: `/payment/${ this.state.selectedTable }`,
        state: {
          tableId: this.state.selectedTable,
        },
      }}>Continuar</Link>
    </div>;
  }
};

export {
  TableSelect,
};