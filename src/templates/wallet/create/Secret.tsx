import {useEffect, useState} from "react";
import {getMnemonic} from "../../../ton/utils";
import {Link} from "react-router-dom";

export function SecretPage() {
    const [wordList, setWordList] = useState({words: [""], encrypted: false});

    const getWordList = async () => {
        const [mnemonic, _] = await getMnemonic();
        const words = mnemonic.split(" ")
        setWordList({words: words, encrypted: false})
    }

    useEffect(() => {
        getWordList().then();
    }, []);

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fi-icon icon-cpu"/></div>
                        <h2 className="main-title">Your private key</h2>
                        <p className="main-desc mb-4">
                            Write these 24 words in exactly that order and hide them in a safe place.
                        </p>
                        { (wordList.words.length == 24) ? (
                            <ul className="row p-0 m-0">
                                {wordList.words.map(function (item, i) {
                                    return <li className="col-6 py-2"><span
                                        className="mr-2 color-grey">{i + 1}.</span>{item}</li>
                                })}
                            </ul>
                        ) : ("</>") }
                        <div className="main-buttons">
                            <Link to="/create-wallet-secret-check" className="btn btn-primary"
                                  state={wordList}>Continue</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}