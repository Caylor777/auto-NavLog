import "../css/shortcutsWindow.css";

function ShortcutsWindow({ onClose }) {
    return (
        <div id="shortcutsOverlay" onClick={onClose}>
            <div id="shortcutsWindowContainer" onClick={(e) => e.stopPropagation()}>
                <div id="shortcutsWindow">
                    <button id="closeButton" onClick={onClose}>×</button>
                    <h1>Shortcuts</h1>
                    <p>* : fill currently selected column down with current input</p>
                    <p>= : add a new row to the bottom </p>
                    <p>- : remove a bottom most row</p>
                </div>
            </div>
        </div>
    )
}

export default ShortcutsWindow;