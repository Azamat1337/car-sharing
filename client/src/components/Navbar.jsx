import React from 'react';

const Navbar = () => {
    return (
        <header className={'bg-slate-200 mx-auto p-4 flex justify-between items-center'}>
            <h2>CarSharingApp</h2>
            <nav>
                <ul>
                    <li>Car List</li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;