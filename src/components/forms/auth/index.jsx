import './style.sass';
import { } from 'react';
import $group from '../group';

export default function ({ title }) {
    return <form id='auth'>
        <div className="title">
            <h2>{title ?? 'Authentication'}</h2>
        </div>
        <div className="group"></div>
        <div className="buttons"></div>
    </form>;
} 
