function Buttons(props) {
    return (
    <div id="buttons">
        <button onClick={props.addPointFunction} className="button" id="addPointButton">+</button>
        <button onClick={props.removePointFunction} className="button" id="removePointButton">-</button>
    </div>
    );
}

export default Buttons;