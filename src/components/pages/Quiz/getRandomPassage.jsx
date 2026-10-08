import { useState, useEffect} from "react";
import { supabase } from "../../../lib/supabaseClient";

function getExcerpt(fullText, targetWordCount = 150) {
    const normalizedText = fullText.replace(/\s+/g, " ").trim();
    const sentences = normalizedText.match(/[^.!?]+[.!?]+(?:[”’"')\]]+)?|[^.!?]+$/g) ?? [];

    if (sentences.length === 0) {
        return "";
    }

    const wordCount = sentence => sentence.trim().split(/\s+/).filter(Boolean).length;
    const sentenceWordCounts = sentences.map(wordCount);
    const totalWordCount = sentenceWordCounts.reduce((total, count) => total + count, 0);

    // A short document cannot supply a 150-word excerpt, so return it intact.
    if (totalWordCount <= targetWordCount) {
        return normalizedText;
    }

    // Only choose starts that have at least the target number of words remaining.
    const possibleStarts = [];
    let remainingWords = totalWordCount;
    for (let index = 0; index < sentences.length; index += 1) {
        if (remainingWords >= targetWordCount) {
            possibleStarts.push(index);
        }
        remainingWords -= sentenceWordCounts[index];
    }

    const startIndex = possibleStarts[Math.floor(Math.random() * possibleStarts.length)];
    let excerpt = "";
    let excerptWordCount = 0;

    for (let index = startIndex; index < sentences.length && excerptWordCount < targetWordCount; index += 1) {
        excerpt += `${excerpt ? " " : ""}${sentences[index].trim()}`;
        excerptWordCount += sentenceWordCounts[index];
    }

    return excerpt;
}

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
            const fullText = await data.text();
            setText(getExcerpt(fullText));
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
