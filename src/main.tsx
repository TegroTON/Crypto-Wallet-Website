import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ScrollToTop } from './ScrollToTop';
import { WalletContextProvider } from './context';
import { ExtensionProcess } from './ExtensionProcess';

ReactDOM.createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <WalletContextProvider>
                <MemoryRouter>
                    <ExtensionProcess>
                        {/* <BrowserRouter> */}
                        <ScrollToTop>
                            <App />
                        </ScrollToTop>
                        {/* </BrowserRouter> */}
                    </ExtensionProcess>
                </MemoryRouter>
            </WalletContextProvider>
        </React.StrictMode>,
    );
