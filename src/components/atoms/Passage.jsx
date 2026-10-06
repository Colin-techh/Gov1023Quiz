import "./Passage.css"
import GetPassage from "../pages/Quiz/getRandomPassage";
function Passage({passageAuthor}) {
    return(
        <div className="passage">
            <GetPassage passageAuthor={passageAuthor}/>
        </div>
    );
}
export default Passage;