import {Link} from "react-router-dom";

export function MainPage() {
  return (
   <main className="page-main pt-5 pt-md-0 pb-5 pb-md-0">
      <div className="container">
         <div className="row align-items-center justify-content-between">
            <div className="col-md-7 col-lg-6 text-center text-md-left">
               <div className="main-icon d-block d-md-none"><i className="fi-icon icon-diamond"></i></div>
               <h1 className="hero-title">Your wallet on <span className="d-block">The Open Network</span></h1>
               <p className="hero-desc">
                  Tonhold is the easiest way to store, send, and receive Toncoin on The Open Network, which is a powerful new blockchain that offers unprecedented transaction speeds.
               </p>
               <div className="hero-buttons">
                  <Link to="/download" className="btn btn-primary"><i className="fi-icon icon-download mr-2"></i>Download</Link>
                  <Link to="/login" className="btn btn-secondary ml-3"><i className="fi-icon icon-log-in mr-2"></i>Web Wallet</Link>
               </div>
            </div>
            <div className="col-md-5 col-lg-5 d-none d-md-block hero-imgbox">
               <div className="hero-phone w-75 w-lg-100"></div>
               <div className="hero-ruby d-none d-lg-block"></div>
            </div>
         </div>
      </div>
   </main>
  )
}
