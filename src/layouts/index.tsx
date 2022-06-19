import { Outlet } from "react-router-dom";
import {Footer, MainFooter} from "../templates/footers";
import {DefaultDarkHeader, DefaultHeader, MainHeader} from "../templates/headers";
import { WalletHeader } from "../templates/headers";

export function DefaultLayuout() {
  return (
    <div className="wrapper">
      <DefaultHeader />
      <Outlet />
      <Footer />
    </div>
  );
}

export function ExoticLayout() {
  return (
    <div className="wrapper">
      <DefaultDarkHeader />
      <Outlet />
      <Footer />
    </div>
  );
}

export function WalletLayout() {
  return (
    <div className="wrapper">
      <WalletHeader />
      <Outlet />
      <Footer />
    </div>
  );
}

export function MainLayuout() {
      return (
    <div className="wrapper">
      <MainHeader />
      <Outlet />
      <MainFooter />
    </div>
  );
}