import './style.sass';
import { useMemo, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function () {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const $icon = useMemo(() => loading ? AiOutlineLoading3Quarters : FaLongArrowAltRight, [loading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); setTimeout(() => { setLoading(false); }, 2000);
    };

    return <form onSubmit={handleSubmit} id='newsletter'>
        <h3>Subscribe to our Newsletter</h3>
        <div>
            <input disabled={loading} type="email" required value={email} onChange={({ currentTarget }) => setEmail(currentTarget.value)} />
            <button type='submit' disabled={loading}>
                <$icon size={25} />
            </button>
        </div>
    </form>;
}