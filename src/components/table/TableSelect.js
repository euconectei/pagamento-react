import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../extras';

import './table-select.css';

class TableSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedTable: 0,
      tables: [],
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillMount() {
    fetch('https://condo-4748a.firebaseio.com/stone/tables.json')
      .then(
        (res) => res.json(),
        (err) => console.log(err)
      )
      .then(
        (tables) => this.setState(() => ({ 
          tables,
          isLoading: false,
        })),
        (err) => console.log(err)
      );
  }

  handleTableChange(event) {
    this.setState({ selectedTable: event.target.value });
  };

  render() {
    const link = (this.state.selectedTable === 0) ? (
      <span className="btn">Selecionar</span>
    ) : (
      <Link className="btn" to={{
        pathname: `/payment/${ this.state.selectedTable }`,
        state: {
          tableId: this.state.selectedTable,
        },
      }}>Selecionar</Link>
    );
    
    const options = Object.keys(this.state.tables).map((table, i) => {
      return (!table.done) ? <option key={i} value={table}>{table}</option> : null;
    });


    return (this.state.isLoading) ? (
      <div className="page"><Loading /></div>
    ) : (
      <div className="page tables">
        <form action={`payment/${this.state.selectedTable}`} id="tableForm" className="grid-center">
          <label htmlFor="tableSelect">Selecione a mesa:</label>
          <select className="table-select" name="tableSelect" id="tableSelect" onChange={ this.handleTableChange } required>
            <option value="">Mesa</option>
            { options }
          </select>

        </form>
        {link}
      </div>
    );
  }
};

export {
  TableSelect,
};