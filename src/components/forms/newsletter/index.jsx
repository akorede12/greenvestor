import './style.sass';
import { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

export default function () {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); setTimeout(() => { setLoading(false); }, 2000);
    };

    return <form onSubmit={handleSubmit} id='newsletter'>
        <h3>Subscribe to our Newsletter</h3>
        <div>
            <input disabled={loading} type="email" required value={email} onChange={({ currentTarget }) => setEmail(currentTarget.value)} />
            <button type='submit' disabled={loading}>
                <FaLongArrowAltRight size={25} />
            </button>
        </div>
    </form>;
}