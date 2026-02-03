function NavBar() {
    return (
        <div id="navBar">
            <img id="logo" src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Auto-NavLog Logo" />
            <div id="githubDiv">
                <a id="githubLink" href="https://github.com/Caylor777" target="_blank" rel="noopener noreferrer">
                    My GitHub
                    <img id="githubLogo" src={process.env.PUBLIC_URL + '/images/github.svg'} alt="GitHub Logo" />
                </a>
            </div>
        </div>
    );
}

export default NavBar;