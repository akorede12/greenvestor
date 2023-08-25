import './style.sass';
import { useState } from 'react';
import { $portfolio } from '../cards';
import { leafImg } from '../../config';

export default function () {
    const [portfolios, setPortfolios] = useState(Array.from({ length: 5 }));

    return <section id="portfolio">
        <div className="title">
            <div>
                <img src={leafImg} alt="" />
                <h2>Investment and Loan Options</h2>
            </div>
            <p>
                At Greenvestor, we offer a range of investment and loan opportunities that
                empower you to make a meaningful impact on sustainable projects.
                Whether you're an investor seeking financial growth or a borrower looking
                to fund your eco-friendly initiatives, we have options tailored to your goals.
            </p>
        </div>

        <div className="content">
            {portfolios.map((_, id) => <$portfolio loading key={id} id={id} />)}
        </div>
    </section>
} 
