import './style.sass';
import { } from "react";
import { $newletter } from '../forms';
import { logoGreen } from '../../config';
import { Link } from 'react-router-dom';

export default function () {
    return <footer>
        <div className="column">
            <img src={logoGreen} alt="" className="logo" />
            <nav>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
                <div>
                    <Link to="#">Privacy Policy</Link>
                    <Link to="#">FAQs</Link>
                    <Link to="#">Terms of Service</Link>
                </div>
            </nav>
        </div>
        <div className="column">
            <$newletter />
            <div className="social-links">
                <a href="#" target='_blank'></a>
                <a href="#" target='_blank'></a>
                <a href="#" target='_blank'></a>
                <a href="#" target='_blank'></a>
            </div>
        </div>
    </footer>;
};