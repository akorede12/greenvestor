import './style.sass';
import { } from 'react';
import { Link } from 'react-router-dom';

export default function ({ id, goal, image, title, loading }) {
    return <div className={`projects-card ${loading == true && 'loading'}`}>
        <div className="flex">
            <img src={image} alt="" />
        </div>
        <div className="flex">
            <div className="column">
                <h3>{title}</h3>
                <Link to={`/projects/${id}`}>
                    <b>view project</b>
                </Link>
            </div>
            <div className="column">
                <div className="row">
                    <h4>project goal</h4>
                    <span>{goal}</span>
                </div>
                <div className="row"></div>
            </div>
        </div>
    </div>;
};
