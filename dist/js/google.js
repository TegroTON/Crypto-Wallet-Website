function addScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}

const IS_EXTENSION = !!(self.chrome && chrome.runtime && chrome.runtime.onConnect);

if (!IS_EXTENSION) {
    addScript("https://www.googletagmanager.com/gtag/js?id=G-E30X11MT9H")

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'G-E30X11MT9H');
}
