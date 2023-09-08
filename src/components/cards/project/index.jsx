import { Link } from 'react-router-dom';
import './style.sass';
import { } from 'react';
import { BsArrowRightCircle } from 'react-icons/bs';

export default function ({ id, image, loading, title, summary, amount }) {
    return <div className={`project-card ${loading == true && 'loading'}`}>
        <div className="flex">
            <img src={image} alt="" />
        </div>
        <div className="flex">
            <div className="column">
                <div className="grid">
                    <h3>{title}</h3>
                </div>
                <div className="grid">
                    <p>{summary}</p>
                </div>
            </div>
            <div className="column">
                <div className="grid">
                    <h4>Total Investment needed</h4>
                    <span>{amount?.toLocaleString?.()} Naira</span>
                </div>
                <div className="grid">
                    <Link to={`/projects/${id}`}>
                        <b>view project</b>
                        <BsArrowRightCircle size={20} />
                    </Link>
                </div>
            </div>
        </div>
    </div>;
};
