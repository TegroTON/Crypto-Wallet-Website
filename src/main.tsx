import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ScrollToTop } from './ScrollToTop';
import { WalletContextProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <WalletContextProvider>
                <MemoryRouter>
                    <ScrollToTop>
                        <App />
                    </ScrollToTop>
                </MemoryRouter>
            </WalletContextProvider>
        </React.StrictMode>,
    );
