import './style.sass';
import { $auth } from '../../components/forms';

export default function ($element) {
    return () => (
        <section id='auth'>
            <$element $auth={$auth} />
        </section>
    );
} 
