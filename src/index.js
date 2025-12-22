import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.scss';
import App from './App.js';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./redux/store";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basname={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
