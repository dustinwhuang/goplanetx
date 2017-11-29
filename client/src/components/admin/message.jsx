import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';

import Response from './response';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageId: null,
      messageName: `${props.message.first_name} ${props.message.last_name}`,
      showResponseForm: false,
    };
    this.onCompleteCheck = this.onCompleteCheck.bind(this);
    this.onRespondClick = this.onRespondClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messageId: nextProps.message.id,
      messageName: `${nextProps.message.first_name} ${nextProps.message.last_name}`,
    });
  }

  // Call initiateResponse in adminView with this message's id
  // Nice to have: indicate which response is being responded to
  onRespondClick() {
    // this.props.setResponseId(this.state.messageId);
    this.setState({
      showResponseForm: !this.state.showResponseForm,
    });
    if (this.props.admin_response === null) {
      alert('null');
    }
  }

  onCompleteCheck() {
    this.props.setStatus(this.state.messageId);
  }

  // Render all open user messages in reverse chrono order
  // Nice to have: order by urgency
  render() {
    console.log('MESSAGE PROPS', this.props);
    if (this.state.showResponseForm) {
      return (
        <div className="user-message-container group">
          <div className="message-contents group">
            <span className="message-created-at">Created: </span><p>{moment(this.props.message.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
            <br></br>
            <span className="message-name">Name: </span><p>{this.props.message.first_name} {this.props.message.last_name}</p>
            <br></br>
            <span className="message-urgency">Urgency: </span><p>{this.props.message.user_urgency}</p>
            <br></br>
            <span className="message-contact">Contact Information: </span>
            <br></br>
            <p>{this.props.message.user_contact}</p>
            <br></br>
            <span className="message-body">Message: </span>
            <br></br>
            <p>{this.props.message.user_message}</p>
          </div>
          <div className="message-actions group">
            <Checkbox
              onClick={this.onCompleteCheck}
              type="checkbox"
            >
            Case Complete
            </Checkbox>
            <Button
              bsStyle="primary"
              onClick={this.onRespondClick}
              className="admin-response-button"
            >
            Hide Response Form
            </Button>
          </div>
          <div className="message-response group">
            <Response
              messageName={this.state.messageName}
              messageId={this.state.messageId}
              submitAdminResponse={this.props.submitAdminResponse}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="user-message-container group">
          <div className="message-contents group">
            <span className="message-created-at">Created: </span><p>{moment(this.props.message.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
            <br></br>
            <span className="message-name">Name: <p>{this.props.message.first_name} {this.props.message.last_name}</p></span>
            <br></br>
            <span className="message-urgency">Urgency: <p>{this.props.message.user_urgency}</p></span>
            <br></br>
            <span className="message-contact">Contact Information: <p>{this.props.message.user_contact}</p></span>
            <br></br>
            <span className="message-body">Message: <p>{this.props.message.user_message}</p></span>
            <br></br>
            <span className="message-body">Your Response: <p>{this.props.message.admin_response !== null ? this.props.message.admin_response : 'You still need to response to this message'}</p></span>
          </div>
          <div className="message-actions group">
            <Checkbox
              onClick={this.onCompleteCheck}
              type="checkbox"
            >
            Case Complete
            </Checkbox>
            <Button
              bsStyle="primary"
              onClick={this.onRespondClick}
              className="admin-response-button"
            >
              Show Response Form
            </Button>
          </div>
        </div>
      );
    }
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    user_urgency: PropTypes.number,
    user_contact: PropTypes.string,
    user_message: PropTypes.string,
    admin_response: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
  submitAdminResponse: PropTypes.func.isRequired,
};

export default Message;
