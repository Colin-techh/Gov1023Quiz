import "./Passage.css"
import GetPassage from "../pages/Quiz/getRandomPassage";
function Passage({fileName}) {
    return(
        <div className="passage">
            <GetPassage fileName={fileName}/>
        </div>
    );
}
export default Passage;