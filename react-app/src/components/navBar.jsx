import "../css/navbar.css";

function NavBar({ onShortcutsClick }) {
    return (
        <div id="navBar">
            <img id="logo" src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Auto-NavLog Logo" />
            <div id="navButtons">
                <button id="shortcutsButton" onClick={onShortcutsClick}>
                    <img id="cmdIcon" src={process.env.PUBLIC_URL + '/images/cmdPrompt.svg'} alt="Command Icon" />
                    Shortcuts
                </button>
                <button id="githubButton" onClick={() => window.open('https://github.com/Caylor777', '_blank')}>
                    <img id="githubLogo" src={process.env.PUBLIC_URL + '/images/github.svg'} alt="GitHub Logo" />
                    My GitHub
                </button>
            </div>
        </div>
    );
}

export default NavBar;