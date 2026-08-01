import React from 'react';
import MyJourney from './MyJourney';
import { Provider } from 'react-redux';
import store from '../../store/store';


function NewDashboard() {
  return (
    <Provider store={store}>
      <MyJourney />
    </Provider>
  );
}

export default NewDashboard;
