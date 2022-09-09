import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Footer, MainFooter } from '../pages/footers';
import {
    DefaultDarkHeader, DefaultHeader, MainHeader, WalletHeader,
} from '../pages/headers';
import { getWindowId } from '../utils';

function Wrapper({ children }: any) {
    const [isWin, setIsWin] = useState<boolean>(false);

    const updateIsWin = async () => setIsWin(!!(await getWindowId()));

    useEffect(() => {
        updateIsWin()
            .then();
    }, []);

    return (
        <div className="wrapper" style={!isWin ? { minWidth: '450px' } : {}}>
            {children}
        </div>
    );
}

export function DefaultLayuout() {
    return (
        <Wrapper>
            <DefaultHeader />
            <Outlet />
            {/* <Footer /> */}
        </Wrapper>
    );
}

export function ExoticLayout() {
    return (
        <Wrapper>
            <DefaultDarkHeader />
            <Outlet />
            {/* <Footer /> */}
        </Wrapper>
    );
}

export function WalletLayout() {
    return (
        <Wrapper>
            <WalletHeader />
            <Outlet />
            {/* <Footer /> */}
        </Wrapper>
    );
}

export function MainLayout() {
    return (
        <Wrapper>
            <MainHeader />
            <Outlet />
            <MainFooter />
        </Wrapper>
    );
}
