import { useState, useEffect} from "react";
import { supabase } from "../../../lib/supabaseClient";

function GetPassage({fileName}) {
    const [text, setText] = useState("");

    useEffect(() => {
        if(!fileName) {
            return;
        }
        async function getText() {
            const {data, error} = await supabase
                .storage
                .from('texts')
                .download(fileName);
            if(error) {
                console.log(error);
                return;
            }
            setText(data.text());
        }
        getText();
    }, [fileName]);

    return(
        <div className="text">
            {text}
        </div>
    );
}
export default GetPassage;