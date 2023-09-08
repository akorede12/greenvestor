import './style.sass';
import { $project } from '../cards';
import { useMyStore } from '../../store';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

export default function ({ title = '', className }) {
    const { projects } = useMyStore();

    return <section id="project" className={className}>
        <div className="indicator">
            <h2>{title}</h2>
            <div className="btn">
                <BsArrowLeftCircle />
                <BsArrowRightCircle />
            </div>
        </div>

        <div className="projects-content">
            {projects.data.slice(0, 5).map((items, id) => <$project key={id} {...items} />)}
        </div>
    </section>;
} 
