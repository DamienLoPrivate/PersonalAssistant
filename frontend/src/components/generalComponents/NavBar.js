const NavBar = ({ goFunc, navigate }) => {
    return (
        <header>
            <div className="NavBar">
                <button onClick={() => goFunc(navigate)}>Home</button>
            </div>
        </header>
    )
}

export default NavBar