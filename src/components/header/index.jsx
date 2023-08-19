import './style.sass';
import { useState, useEffect, useRef } from "react";
import { logoWhite, logoGreen } from '../../config';

export default function ({ opague = false }) {
    const root = useRef(document.querySelector('#root'));

    const [status, setStatus] = useState(opague);
    const [color, setColor] = useState(opague ? 'text-black' : 'text-white');

    useEffect(() => {
        root.current?.addEventListener('scroll', handleScroll);
        return () => root.current?.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = (ev) => {
        console.log(ev.target?.scrollTop);
        setStatus(ev.target.scrollTop > 50 || opague);
    };

    return <header className={`${opague ? 'bg-white sticky' : 'fixed'} ${status == true && 'bg-white'}`}>
        <a className={status ? 'text-black' : 'text-white'} href="/" id="logo"><img src={status ? logoGreen : logoWhite} alt="" /></a>

        <nav>
            <a className={status ? 'text-black' : 'text-white'} href="#">home</a>
            <a className={status ? 'text-black' : 'text-white'} href="#">projects</a>
            <a className={status ? 'text-black' : 'text-white'} href="#">about</a>
            <a className={status ? 'text-black' : 'text-white'} href="#">contact us</a>
        </nav>

        <nav className='buttons'>
            <a className={status ? 'text-black' : 'text-white'} href="#">sign in</a>
            <a className={status ? 'text-black' : 'text-white'} href="#">sign in</a>
        </nav>
    </header>;
};
