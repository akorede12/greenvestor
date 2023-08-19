import './style.sass';
import { useState } from 'react';

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
            <button type='submit' disabled={loading}></button>
        </div>
    </form>;
}