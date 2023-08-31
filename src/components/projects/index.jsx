import './style.sass';
import { useState } from 'react';
import { $projects } from '../cards';

export default function ({ className }) {
    const [projects, setProjects] = useState(Array.from({ length: 8 }));

    return <section id="projects" className={className}>
        <div className="header">
            <h2>Discover Projects</h2>
            <div className="links">
                <button>All Projects</button>
                <button>Energy</button>
                <button>Agriculture</button>
                <button>Water</button>
                <button>Conservation</button>
                <button>Green</button>
            </div>
        </div>
        <div className="content">
            {projects.map((_, id) => <$projects key={id} />)}
        </div>
    </section>;
} 
