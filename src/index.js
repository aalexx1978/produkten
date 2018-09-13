import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();
ReactDOM.render(<Provider store={store}>
    <App store={store}/>
</Provider>, document.getElementById('root'));
registerServiceWorker();
