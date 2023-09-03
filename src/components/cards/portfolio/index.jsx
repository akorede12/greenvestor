import './style.sass';
import { } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';

export default function ({ id, index, image, summary, features }) {
    return <div className={`portfolio-card ${index % 2 ? 'flex-row-reverse' : 'flex-row'}`}>
        
        <div className="flex">
            <img src={image} alt="" />
        </div>
        <div className="flex">
            <div className="header">
                <h3>Investment Opportunities</h3>
                <div className="features">
                    {features?.map(feature => <span key={feature}>{feature}</span>)}
                </div>
            </div>
            <div className="info">
                <p>{summary}</p>
                <Link to={`/projects/${id}`}>
                    <b>learn more</b>
                    <BsArrowRightShort size={25} />
                </Link>
            </div>
        </div>
    </div>
} 
