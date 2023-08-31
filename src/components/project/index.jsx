import './style.sass';
import { useState } from 'react';
import { $project } from '../cards';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

export default function ({ title = '', className }) {
    const [projects, setProjects] = useState(Array.from({ length: 5 }));

    return <section id="project" className={className}>
        <div className="indicator">
            <h2>{title}</h2>
            <div className="btn">
                <BsArrowLeftCircle />
                <BsArrowRightCircle />
            </div>
        </div>

        <div className="projects-content">
            {projects.map((_, id) => <$project key={id} />)}
        </div>
    </section>;
} 
