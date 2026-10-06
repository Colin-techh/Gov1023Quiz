import './Dropdown.css';
import { useState, useEffect } from 'react';
function Dropdown({onChange, list}) {
    const [authors, setAuthors] = useState(list);

    useEffect(() => {
        if(list) {
            setAuthors([...new Set(list.map(name => name.slice(0, -6)))]);
        }
    }, [list]);

    if(!authors) {
        return;
    }
    
    return(
        <div className="dropdown-wrapper">
            <select id="nice-dropdown" className="nice-dropdown" onChange={e => onChange(e.target.value)}>
                {authors.map(name => (
                    <option value={name}key={name}>{name}</option>
                ))}
            </select>
        </div>
    );
}
export default Dropdown;