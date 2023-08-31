import './style.sass';
import { } from 'react';

export default function ({ loading }) {
    return <div className={`projects-card ${loading == true && 'loading'}`}>
        <div className="flex">
            <img src="" alt="" />
        </div>
        <div className="flex"></div>
    </div>;
};
