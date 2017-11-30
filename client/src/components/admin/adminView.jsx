import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Message from './message';


class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // example data for mocking
      messages: [
        {
          id: 1,
          createdAt: '2017-11-30T00:49:35.000Z',
          first_name: 'Jane',
          last_name: 'Smith',
          user_message: 'Test message',
          user_contact: 'Test contact info',
          user_urgency: 3,
        },
        {
          id: 2,
          createdAt: '2017-11-30T00:49:35.000Z',
          first_name: 'Lady',
          last_name: 'Person',
          user_message: 'Test message 2',
          user_contact: 'Test contact info 2',
          user_urgency: 1,
        },
      ],
      messageId: null,
      search: '',
      // response: '',
    };

    this.setResponseId = this.setResponseId.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentDidMount() {
    this.props.retrieveOpenMessages((data) => {
      console.log('ADMIN MESSAGES', data);
      this.setState({
        // may have to change 'data' depending on format
        messages: data,
      });
    });
  }

  //  sets state variable messageId to currently selected message's id
  setResponseId(id) {
    this.setState({
      messageId: id,
    });
  }

  // componentWillReceiveProps() {
  //   this.props.retrieveOpenMessages( (data) => {
  //     console.log('ADMIN MESSAGES', data);
  //     this.setState({
  //       //may have to change 'data' depending on format
  //       messages: data
  //     });
  //   });
  // }

  searchFilter(e) {
    console.log('SEARCH ', e.target.value);
    this.setState({
      search: e.target.value,
    });
  }

  // calls the markAsComplete method in index.jsx to send id and status to server


  render() {
    return (
      <div>
        <Button
          onClick={() => this.props.showLogIn()}
          className="admin-change-user-button"
          bsSize="small"
          bsStyle="primary"
        >
          Sign In as a Different User
        </Button>
        <div className="admin-header group">
          <h3 className="welcome-header">Welcome to Your Inbox!</h3>
          <h4>You can view and respond to user messages here.</h4>
        </div>
        <div className="admin-msg-search">
          <input
            id="adminMessageSearch"
            type="text"
            placeholder="Search..."
            onChange={this.searchFilter}
          />
        </div>
        <ul className="user-message-ul">
          {this.state.messages.filter(message => (
            // console.log('user message ', message.user_message)
            message.user_message.toLowerCase().includes(this.state.search.toLowerCase()) ||
            (`${message.first_name.toLowerCase()} ${message.last_name.toLowerCase()}`).includes(this.state.search.toLowerCase())
          )).map(message => (
            <Message
              submitAdminResponse={this.submitAdminResponse}
              key={message.id}
              message={message}
              setResponseId={this.setResponseId}
            />
          ))}
        </ul>

      </div>
    );
  }
}

AdminView.propTypes = {
  retrieveOpenMessages: PropTypes.func.isRequired,
  showLogIn: PropTypes.func.isRequired,
};

export default AdminView;
