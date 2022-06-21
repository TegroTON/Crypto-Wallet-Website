import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ScrollToTop } from './ScrollToTop';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MemoryRouter>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </MemoryRouter>
    </React.StrictMode>,
);
