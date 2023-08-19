import './style.sass';
import { } from 'react';
import { heroImg, leafImg } from '../../config';

export default function () {
    return <section id="banner">
        <div className="title">
            <h3>Invest in a Sustainable Future</h3>
            <h2>Empower Change through Sustainable Projects</h2>
        </div>
        <div className="content">
            <div className="main">
                <div className="flex">
                    <p>
                        At Greenvestor, your investments drive positive change.
                        Choose from curated sustainable projects to make a financial
                        commitment with an environmental impact. Join us in shaping a greener future today.
                    </p>
                    <button><b>Get Started</b></button>
                </div>
                <div className="flex">
                    <img src={heroImg} alt="" />
                </div>
            </div>
            <div className="info">
                <div>
                    <h3>
                        Borrow capital or invest in sustainable projects to drive positive change
                    </h3>
                    <div className="links">
                        <a href="#">Support impactful initiatives</a>
                        <a href="#">earn sustainable returns</a>
                        <a href="#">create a greener world</a>

                    </div>
                </div>
                <img src={leafImg} alt="" />
            </div>
        </div>
    </section>;
} 
