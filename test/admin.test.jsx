import React from 'react';
import { shallow } from 'enzyme';
import AdminView from '../client/src/components/admin/adminView';
import Response from '../client/src/components/admin/response';

/* TEST ADMIN COMPONENTS */

// describe('Component: Message', () => {
//   const message = {
//     createdAt: '2017-11-25T15:13:29.000Z',
//     first_name: 'Brad',
//     last_name: 'Pitt',
//     user_contact: 'the quick brown fox',
//     user_message: 'jumped over the lazy dog',
//     user_urgency: '2'
//   };

//   it('should match its empty snapshot', () => {
//     const component = shallow( <Message message={message}/>);

//     expect(component).toMatchSnapshot();
//   });

// });

describe('Component: AdminView', () => {
  const showLogIn = () => {
    console.log('show log in');
  };
  const retrieveMessages = () => {
    console.log('retrieve open messages');
  };

  it('should match its empty snapshot', () => {
    const component = shallow((
      <AdminView showLogIn={showLogIn} retrieveMessages={retrieveMessages} />
    ));

    expect(component).toMatchSnapshot();
  });
});

describe('Component: Response', () => {
  const messageName = 'Brad Pitt';
  const messageId = 2;
  const submitAdminResponse = () => {
    console.log('submit admin response');
  };
  it('should match its empty snapshot', () => {
    const component = shallow((
      <Response
        messageName={messageName}
        messageId={messageId}
        submitAdminResponse={submitAdminResponse}
      />
    ));

    expect(component).toMatchSnapshot();
  });
});
