import './style.sass';
import { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function ({ title }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); setTimeout(() => { setLoading(false); }, 2000);
    };

    return <form onSubmit={handleSubmit} method="post" id="search">
        <h3>{title}</h3>
        <div>
            <input
                required
                type="search" 
                value={email}
                disabled={loading}
                placeholder='Search by name, category or amount'
                onChange={({ currentTarget }) => setEmail(currentTarget.value)}
            />
            <button type='submit' disabled={loading}>
                {loading ? <AiOutlineLoading3Quarters /> : "Search"}
            </button>
        </div>
    </form>;
}