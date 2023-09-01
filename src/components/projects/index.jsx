import './style.sass';
import { $projects } from '../cards';
import { useMyStore } from '../../store';
import { useEffect, useState } from 'react';

export default function ({ className }) {
    const { projects } = useMyStore();
    const [filter, setFilter] = useState('');
    const [filtered, setFiltered] = useState([]);

    const handleFilter = ({ currentTarget: t }) => setFilter(t.title || '');

    useEffect(() => {
        setFiltered(prev =>
            projects.data.filter(p => filter.length ? p.category == filter : true)
        )
    }, [filter]);


    return <section id="projects" className={className}>
        <div className="header">
            <h2>Discover Projects</h2>
            <div className="links">
                <button onClick={handleFilter} title=''>All Projects</button>
                <button onClick={handleFilter} title='energy'>Energy</button>
                <button onClick={handleFilter} title='agriculture'>Agriculture</button>
                <button onClick={handleFilter} title='water'>Water</button>
                <button onClick={handleFilter} title='conservation'>Conservation</button>
                <button onClick={handleFilter} title='green'>Green</button>
            </div>
        </div>
        <div className="content">
            {filtered.map((item, id) => <$projects key={id} {...item} />)}
        </div>
    </section>;
} 
