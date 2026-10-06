
import "./Quiz.css";
import Passage from "../../atoms/Passage";
import ButtonBar from "../../molecules/ButtonBar";
import { useState, useEffect} from "react";
import Head from "../../atoms/Head";
import { supabase } from "../../../lib/supabaseClient";

async function loadPassageUrl(listOfFileNames) {
    
    let indexOfFileName = Math.floor(Math.random() * listOfFileNames.length) 
    
    return listOfFileNames[indexOfFileName];
}
async function loadFileNames() {
    const {data, error} = await supabase
        .storage
        .from('texts')
        // Pass an empty path to list files at the root of the `texts` bucket.
        // Use a real folder name here only when the files are stored under it.
        .list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        }); 
    
    if(error) {
        console.log(error);
        return;
    }
    const fileNames = (data ?? [])
        .filter(file => file.id !== null) // excludes folder entries
        .map(file => file.name);
    
    return fileNames;
}

function Quiz() {
    
    const [author, setAuthor] = useState("");
    const [guess, setGuess] = useState("");
    const [list, setList] = useState("");
    const [source, setSource] = useState("");
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        loadFileNames().then(response => {
            
            setList(response);
            return loadPassageUrl(response);
        })
        .then(res => {
            setAuthor(res);
        })
        .catch(err => {console.log(err);});
        return () => controller.abort();
    }, []);
    
    const clicksSubmit = () => {
        if(author.slice(0, -6) == guess) {
            alert("Correct! Answer was " + author.slice(0, -6));
        } else {
            alert("Incorrect, answer was " + author.slice(0, -6));
        }
    }

    const nextPassage = () => {
        loadPassageUrl(list).then(res => {
            setAuthor(res);
        });
    }
    const alertSource = () => {
        alert(source[author]);
    }
    return(
        <div>
            <Head></Head>
            <Passage passageAuthor={author}/>
            <ButtonBar onGuess={clicksSubmit} onChange={setGuess} list = {list} nextPassage={nextPassage} source = {alertSource}/>

        </div>
    )
}
export default Quiz;
