import { useState, useEffect} from "react";

function GetPassage({passageAuthor}) {
    const [blob, setBlob] = useState("");

    useEffect(() => {
        if(!passageAuthor) {
            return;
        }
        async function getBlob() {
            
            let urlOfTextToFetch = "https://raw.githubusercontent.com/Colin-techh/Gov1023QuizTexts/refs/heads/main/texts/";

            urlOfTextToFetch += passageAuthor;

            // Now that we have URL, load passage
            await fetch(urlOfTextToFetch)
                .then(response => response.text())
                .then(text => {
                    let randomStart = Math.floor(Math.random() * (text.length - 1000));
                    let passage = text.slice(randomStart, randomStart + 1000);
                    setBlob(passage);
                })
                .catch(err => {
                    console.log(err);
                });

            // let passage = "";
            // await fetch(urlOfTextToFetch)
            //     .then(response => response.body.getReader())
            //     .then(reader => {
            //         reader.read()
            //             .then(({value: chunk, done: d}) => {
            //                 let randomStart = Math.floor(Math.random() * chunk.length);

            //                 chunk.slice(randomStart, randomStart + 1000).forEach(char => {
            //                     passage += String.fromCharCode(char);
            //                 });

            //                 setBlob(passage);
            //             })
            //             .catch(err => {
            //                 console.log(err);
            //             });
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
            
        }
        getBlob();
    }, [passageAuthor]);

    return(
        <div className="text">
            {blob}
        </div>
    );
}
export default GetPassage;