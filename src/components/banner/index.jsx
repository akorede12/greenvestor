import './style.sass';
import { useState } from 'react';
import { $project } from '../cards';
import $projects from '../projects';
import { Link } from 'react-router-dom';
import { heroImg, leafImg } from '../../config';
import { BsArrowLeftCircle, BsArrowRightCircle, BsArrowDownCircle } from 'react-icons/bs';

export default function () {
    const [projects, setProjects] = useState(Array.from({ length: 5 }));

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
                    <button>
                        <b>Get Started</b>
                        <BsArrowDownCircle size={25} />
                    </button>
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
                        <Link to="/">Support impactful initiatives</Link>
                        <Link to="/">earn sustainable returns</Link>
                        <Link to="/">create a greener world</Link>

                    </div>
                </div>
                <img src={leafImg} alt="" />
            </div>

            <$projects />

            <div className="btn">
                <Link to="/projects">
                    <b>Explore Projects</b>
                    <BsArrowRightCircle size={25} />
                </Link>
            </div>
        </div>
    </section>;
} 
