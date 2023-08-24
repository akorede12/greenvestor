import './style.sass';
import { } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';

export default function ({ loading, id }) {
    return <div className={`portfolio-card ${id % 2 ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex">
            {/* <img src="" alt="" /> */}
        </div>
        <div className="flex">
            <div className="header">
                <h3>Investment Opportunities</h3>
                <div className="links">
                    <Link to="/">Support impactful initiatives</Link>
                    <Link to="/">earn sustainable returns</Link>
                    <Link to="/">create a greener world</Link>

                </div>
            </div>
            <div className="info">
                <p>
                    Investing in sustainable projects with Greenvestor goes beyond financial gains
                    - it's about driving positive change and contributing to a greener world.
                </p>
                <Link to='#'>
                    <b>learn more</b>
                    <BsArrowRightShort size={25} />
                </Link>
            </div>
        </div>
    </div>
} 
