import './style.sass';
import { } from "react";
import { $newletter } from '../forms';
import { logoWhite } from '../../config';

export default function () {
    return <footer>
        <div className="column">
            <img src={logoWhite} alt="" className="logo" />
            <nav>
                <div>
                    <a href="#">Home</a>
                    <a href="#">Projects</a>
                    <a href="#">About</a>
                    <a href="#">Contact Us</a>
                </div>
                <div>
                    <a href="#">Privacy Policy</a>
                    <a href="#">FAQs</a>
                    <a href="#">Terms of Service</a>
                </div>
            </nav>
        </div>
        <div className="column">
            <$newletter />
            <div className="social-links">
                <a href='#'></a>
                <a href='#'></a>
                <a href='#'></a>
                <a href='#'></a>
            </div>
        </div>
    </footer>;
};