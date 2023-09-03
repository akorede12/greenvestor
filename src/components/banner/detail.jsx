import './style.sass';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMyStore } from '../../store';

export default function ({ }) {
    const { id } = useParams();
    const { projects } = useMyStore();
    const [item, setItem] = useState(null);

    useEffect(() => {
        setItem(projects.data.find(p => p.id == id) || null);
    }, [id]);

    return <section id="banner-detail">
        <div className="image">
            <img src={item?.image} alt="" />
        </div>
        <div className="detail">
            <h3>{item?.title}</h3>
            <div className="content">
                <div className='desc'>
                    <h4>mission:</h4>
                    <p>{item?.mission}</p>
                </div>
                <div className='desc'>
                    <h4>vision:</h4>
                    <p>{item?.vision}</p>
                </div>
                <div className='desc'>
                    <h4>sustainability goals:</h4>
                    <p>{item?.goal}</p>
                </div>
            </div>
        </div>
    </section>;
} 
