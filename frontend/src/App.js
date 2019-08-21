import React, { Component } from "react";
import Modal from './components/Modal'
import axios from 'axios'
import ReactCountryFlag from 'react-country-flag'

const roundedStyle = {
  mozBorderRadius: '10px',
  webkitBorderRadius: '10px',
  borderRadius: '10px', /* future proofing */
  khtmlBorderRadius: '10px' /* for old Konqueror browsers */
}

const pointerStyle = {
  cursor: 'pointer'
}

const lineItemStyle = Object.assign({}, roundedStyle, pointerStyle)
const headerStyle = Object.assign({}, roundedStyle, {backgroundColor: 'lightblue'})
const orderedListStyle = Object.assign({}, roundedStyle, {listStyleType: 'decimal'})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        name: "",
        winnings: 0,
        country: ""
      },
      leaderboardList: []
    };
  }

  

  formatCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })
    return formatter.format(num)
  }

  componentDidMount() {
    this.refreshList();
    // We need to set the CSRF for the Django backend.
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  }

  refreshList = () => {
    axios
      .get("api/leaderboard/")
      .then(res => this.setState({ leaderboardList: res.data }))
      .catch(err => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    // If we have an ID we are updating, else creating.
    if (item.id) {
      axios
        .put(`api/leaderboard/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("api/leaderboard/", item)
      .then(res => this.refreshList());
  };
  
  createItem = () => {
    // reset 'activeItem' and open the modal
    const item = { name: "", winnings: 0, country: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    // edit clicked item
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const { leaderboardList } = this.state;
    
    return leaderboardList.sort((itemA, itemB) => parseFloat(itemB.winnings) - parseFloat(itemA.winnings)).map((item, idx) => (
      <li
        key={item.id}
        onClick={() => this.editItem(item)}
        style={lineItemStyle}
        className="list-group-item d-flex justify-content-between align-items-left hover-list"
      >
        <span
          className='leaderboard-title col-sm'
          title={item.name}
        >
          {idx+1}. {item.name}
        </span>
        <span
          className='leaderboard-winnings col-sm'
          title={item.name}
        >
          {this.formatCurrency(item.winnings)}
        </span>
        <span
          className='leaderboard-country col-sm'
          title={item.country}
        >
          <ReactCountryFlag code={item.country} styleProps={{ height: 32, width: 32, marginBottom: 10}} svg /> {item.country}
        </span>
      </li>
    ));
  };
  
  render() {
    return (
      <main className="content">
        <h1 className="text-uppercase text-center my-4">Poker Leaderboard App</h1>
        <div className="row ">
          <div className="col-md-11 col-sm-11 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                All Time Tournament Earnings
              </div>
              <ol className="list-group list-group-flush" style={orderedListStyle}>
                <li className="list-group-item d-flex justify-content-between align-items-left" style={headerStyle}>
                  <span className='col-sm'>
                    Player
                  </span>
                  <span className='col-sm'>
                    Winnings
                  </span>
                  <span className='col-sm'>
                    Native Of
                  </span>
                </li>
                {this.renderItems()}
              </ol>
              <button className="btn btn-primary col-sm-12" onClick={this.createItem} style={roundedStyle}>Add Player</button>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;