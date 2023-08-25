import { Link } from 'react-router-dom';
import './style.sass';
import { } from 'react';

export default function ({ loading }) {
    return <div className={`project-card ${loading == true && 'loading'}`}>
        <div className="flex">
            {/* <img src="" alt="" /> */}
        </div>
        <div className="flex">
            <div className="column">
                <div className="grid">
                    <h3>Lorem ipsum dolor sit.</h3>
                </div>
                <div className="grid">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nostrum enim incidunt atque porro provident dicta,
                        facere quidem vitae. Aut, nostrum!
                    </p>
                </div>
            </div>
            <div className="column">
                <div className="grid">
                    <h4>Total Investment needed</h4>
                    <span>250,000 Naira</span>
                </div>
                <div className="grid">
                    <Link to='/'></Link>
                </div>
            </div>
        </div>
    </div>;
};
