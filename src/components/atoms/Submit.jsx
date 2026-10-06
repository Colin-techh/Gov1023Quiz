function Submit({onGuess}) {
    return(
        <div>
            <button
                className="modern-button"
                onClick={onGuess}
                >Submit</button>
        </div>
    )
}
export default Submit;