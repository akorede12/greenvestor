import './style.sass';
import $header from '../../components/header';
import $footer from '../../components/footer';

export default function ($element) {
    return () => (<>
        <$header opague />
        <$element />
        <$footer />
    </>);
} 
