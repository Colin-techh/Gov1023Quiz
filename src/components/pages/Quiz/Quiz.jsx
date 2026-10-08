
import "./Quiz.css";
import Passage from "../../atoms/Passage";
import ButtonBar from "../../molecules/ButtonBar";
import { useState, useEffect} from "react";
import Head from "../../atoms/Head";
import { supabase } from "../../../lib/supabaseClient";

async function getRandomObjectFrom(listOfFileNames) {
    
    let indexOfFileName = Math.floor(Math.random() * listOfFileNames.length) 
    
    return listOfFileNames[indexOfFileName];
}
async function pickRandomTextFromAuthor(author) {
    const {data, error} = await supabase
        .from('texts')
        .select()
        .eq('author',author)
    if(error) {
        console.log(error);
        return;
    }
    if (!data?.length) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex].textName;
}
async function getAuthorList() {
    const {data, error} = await supabase
        .from('authors')
        // Pass an empty path to list files at the root of the `texts` bucket.
        // Use a real folder name here only when the files are stored under it.
        .select('author'); 
    
    if(error) {
        console.log(error);
        return;
    }
    
    return data;
}

function Quiz() {
    
    const [fileName, setFileName] = useState("");
    const [guess, setGuess] = useState("");
    const [list, setList] = useState("");
    const [authorPlain, setAuthorPlain] = useState('');
    useEffect(() => {
        
        getAuthorList().then(response => {
            
            setList(response);
            return getRandomObjectFrom(response);
        })
        .then((authorName) => {
            setAuthorPlain(authorName.author);
            return pickRandomTextFromAuthor(authorName.author);
        })
        .then(textName => {
            setFileName(textName);
        })
        .catch(err => {console.log(err);});
    }, []);
    
    const clicksSubmit =  () => {
        if(authorPlain == guess) {
            alert("Correct! Answer was " + authorPlain);
        } else {
            alert("Incorrect, answer was " + authorPlain);
        }
    }

    const nextPassage = () => {
        getRandomObjectFrom(list).then(res => {
            setAuthorPlain(res.author);
            return pickRandomTextFromAuthor(res.author);
        })
        .then(textName => {
            setFileName(textName);
        });
    }
    const alertSource = async () => {
        const {data, error} = await supabase
            .from('texts')
            .select()
            .eq('textName',fileName)
            .single();
        if(error) {
            console.log(error);
            return;
        }

        alert(data.source);
    }
    return(
        <div>
            <Head></Head>
            <Passage fileName={fileName}/>
            <ButtonBar onGuess={clicksSubmit} onChange={setGuess} list = {list} nextPassage={nextPassage} source = {alertSource}/>

        </div>
    )
}
export default Quiz;
