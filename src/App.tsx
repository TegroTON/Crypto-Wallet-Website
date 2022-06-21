import {
    Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import { ConnectPage } from './templates/wallet/connect';
import {
    DefaultLayuout, ExoticLayout, MainLayout, WalletLayout,
} from './layouts';
import { LoginPage } from './templates/wallet/login';
import { WalletPage } from './templates/wallet/wallet';
import { LoginOnly, UnloginOnly } from './ton/utils';
import { ReadyPage } from './templates/wallet/create/Ready';
import { SecretPage } from './templates/wallet/create/Secret';
import { SecretCheckPage } from './templates/wallet/create/SecretCheck';
import { NewPasswordPage } from './templates/wallet/create/NewPassword';
import { CongratulationPage } from './templates/wallet/create/Congratulation';
import { SendPage } from './templates/wallet/wallet/Send';
import { PaymentProtectionPage } from './templates/wallet/wallet/PaymentProtection';
import { SendingPage } from './templates/wallet/wallet/Sending';
import { SuccessfulPage } from './templates/wallet/wallet/Successful';
import { ReceivePage } from './templates/wallet/wallet/Receive';
import { SettingsPage } from './templates/wallet/wallet/Settings';
import { PrivacyPage } from './templates/wallet/wallet/Privacy';
import { AddTokenPage } from './templates/wallet/wallet/AddToken';
import { JettonPage } from './templates/wallet/wallet/Jetton';
import { MainPage } from './templates/wallet/main';
import { DownloadPage } from './templates/wallet/main/Download';

export default function App() {
    return (
        <Routes>
            {/* <Route path="/" element={<MainLayout />}> */}
            {/*    <Route index element={<UnloginOnly><MainPage /></UnloginOnly>} /> */}
            {/* </Route> */}
            <Route path="/" element={<DefaultLayuout />}>
                <Route index element={<UnloginOnly><LoginPage /></UnloginOnly>} />
                <Route path="connect-wallet" element={<ConnectPage />} />
                <Route path="create-wallet" element={<ReadyPage />} />
                <Route path="create-wallet-secret" element={<SecretPage />} />
                <Route path="create-wallet-secret-check" element={<SecretCheckPage />} />
                <Route path="create-wallet-new-password" element={<NewPasswordPage />} />
                <Route path="create-wallet-congratulations" element={<CongratulationPage />} />
                <Route path="payment-protect" element={<PaymentProtectionPage />} />
                <Route path="send-ton" element={<SendPage />} />
                <Route path="sending" element={<SendingPage />} />
                <Route path="successful" element={<SuccessfulPage />} />
                <Route path="receive-ton" element={<ReceivePage />} />
                <Route path="settings" element={<LoginOnly><SettingsPage /></LoginOnly>} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="add-token" element={<AddTokenPage />} />
                <Route path="download" element={<DownloadPage />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="/jetton" element={<ExoticLayout />}>
                <Route index element={<LoginOnly><JettonPage /></LoginOnly>} />
            </Route>
            <Route path="/wallet" element={<LoginOnly><WalletLayout /></LoginOnly>}>
                <Route index element={<WalletPage />} />
                <Route path="*" element={<Navigate to="/wallet" replace />} />
            </Route>
        </Routes>
    );
}
