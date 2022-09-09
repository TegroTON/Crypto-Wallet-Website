import {
    Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import { ConnectPage } from './pages/connect';
import {
    DefaultLayuout, ExoticLayout, MainLayout, WalletLayout,
} from './layouts';
import { LoginPage } from './pages/login';
import { WalletPage } from './pages/wallet';
import { CheckLogin } from './checkLogin';
import { ReadyPage } from './pages/create/Ready';
import { SecretPage } from './pages/create/Secret';
import { SecretCheckPage } from './pages/create/SecretCheck';
import { NewPasswordPage } from './pages/create/NewPassword';
import { CongratulationPage } from './pages/create/Congratulation';
import { SendPage } from './pages/wallet/Send';
import { ProtectionPage } from './pages/wallet/Protection';
import { SendingPage } from './pages/wallet/Sending';
import { SuccessfulPage } from './pages/wallet/Successful';
import { ReceivePage } from './pages/wallet/Receive';
import { SettingsPage } from './pages/wallet/Settings';
import { PrivacyPage } from './pages/wallet/Privacy';
import { JettonPage } from './pages/wallet/Jetton';
import { DownloadPage } from './pages/main/Download';
import './i18n';
import { ChangePasswordPage } from './pages/wallet/ChangePassword';
import { AddTokensPage } from './pages/wallet/AddTokens/AddTokens';
import { AddTokensConfirmPage } from './pages/wallet/AddTokens/AddTokensConfirm';
import { SignaturePage } from './pages/wallet/Signature';
import { SigningPage } from './pages/wallet/Signing';
import { ConfirmTransactionPage } from './pages/wallet/ConfirmTransaction';

export default function App() {
    return (
        <Routes>
            {/* <Route path="/" element={<MainLayout />}> */}
            {/*    <Route index element={<UnloginOnly><MainPage /></UnloginOnly>} /> */}
            {/* </Route> */}
            <Route path="/" element={<DefaultLayuout />}>
                <Route index element={<CheckLogin />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="connect-wallet" element={<ConnectPage />} />
                <Route path="create-wallet" element={<ReadyPage />} />
                <Route path="create-wallet-secret" element={<SecretPage />} />
                <Route path="create-wallet-secret-check" element={<SecretCheckPage />} />
                <Route path="create-wallet-new-password" element={<NewPasswordPage />} />
                <Route path="create-wallet-congratulations" element={<CongratulationPage />} />
                <Route path="protect" element={<ProtectionPage />} />
                <Route path="send-ton" element={<SendPage />} />
                <Route path="sending" element={<SendingPage />} />
                <Route path="successful" element={<SuccessfulPage />} />
                <Route path="receive-ton" element={<ReceivePage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="add-tokens" element={<AddTokensPage />} />
                <Route path="add-tokens-confirm" element={<AddTokensConfirmPage />} />
                <Route path="download" element={<DownloadPage />} />
                <Route path="change-password" element={<ChangePasswordPage />} />
                <Route path="signature" element={<SignaturePage />} />
                <Route path="signing" element={<SigningPage />} />
                <Route path="confirm-transaction" element={<ConfirmTransactionPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="/jetton" element={<ExoticLayout />}>
                <Route index element={<JettonPage />} />
            </Route>
            <Route path="/wallet" element={<WalletLayout />}>
                <Route index element={<WalletPage />} />
                <Route path="*" element={<Navigate to="/wallet" replace />} />
            </Route>
        </Routes>
    );
}
