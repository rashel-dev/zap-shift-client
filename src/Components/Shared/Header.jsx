import React from "react";
import Logo from "../ui/logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Header = () => {

    const {user, logOut} = useAuth();

    const handleLogOut = () => {
        logOut()
        .then()
        .catch(error =>{
            console.log(error);
        })
    }

    const navLinks = (
        <>
            <li>
                <NavLink to="">Services</NavLink>
            </li>
            <li>
                <NavLink to="/coverage">Coverage</NavLink>
            </li>
            <li>
                <NavLink to="/about-us">About Us</NavLink>
            </li>
            <li>
                <NavLink to="/send-parcel">Send Parcel</NavLink>
            </li>
            {
                user && (
                    <li>
                        <NavLink to="/dashboard/my-parcels">My Parcels</NavLink>
                    </li>
                )
            }
        </>
    );
    return (
        <div className="navbar bg-base-100 shadow-sm ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {" "}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
                        </svg>
                    </div>
                    <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <div className="btn btn-ghost text-xl">
                    <Logo></Logo>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>
            <div className="navbar-end space-x-2">
                {user ? (
                    <a onClick={handleLogOut} className="btn">
                        Logout
                    </a>
                ) : (
                    <Link to="/login" className="btn">
                        Login
                    </Link>
                )}
                <Link to="/rider" className="btn btn-primary text-black dark:text-white ">
                    Be A Rider
                </Link>
            </div>
        </div>
    );
};

export default Header;
