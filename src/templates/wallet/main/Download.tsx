export function DownloadPage() {
    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fa-regular fa-download color-blue" /></div>
                        <h2 className="main-title">Download</h2>
                        <p className="main-desc">
                            You can download an app for your phone
                            <br />
                            or install a browser extension.
                        </p>
                        <div className="download-buttons mt-5">
                            <a href="#!" className="btn btn-secondary btn-block mb-3">
                                <i className="fi-icon icon-apple btn-icon font-18 mr-2" />
                                App Store
                            </a>
                            <a href="#!" className="btn btn-secondary btn-block mb-3">
                                <i className="fi-icon icon-google-play btn-icon font-18 mr-2" />
                                Google Play
                            </a>
                            <a href="#!" className="btn btn-secondary btn-block">
                                <i className="fi-icon icon-chrome btn-icon font-18 mr-2" />
                                Chrome App
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
