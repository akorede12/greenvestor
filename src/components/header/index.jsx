import './style.sass';
import { Link } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';
import { useState, useEffect, useRef } from "react";
import { logoWhite, logoGreen } from '../../config';

export default function ({ opague = false, fixed = false }) {
    const root = useRef(document.querySelector('#root'));

    const [status, setStatus] = useState(opague);

    useEffect(() => {
        root.current?.addEventListener('scroll', handleScroll);
        return () => root.current?.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = (ev) => {
        setStatus(ev.target.scrollTop > 50 || opague);
    };

    return <header className={`${status ? 'bg-white' : 'transparent'} ${fixed ? 'fixed' : 'sticky'}`}>
        <Link className={status ? 'text-black' : 'text-white'} to="/" id="logo"><img src={status ? logoGreen : logoWhite} alt="" /></Link>

        <nav>
            <Link className={status ? 'text-black' : 'text-white'} to="/">home</Link>
            <Link className={status ? 'text-black' : 'text-white'} to="/projects">projects</Link>
            <Link className={status ? 'text-black' : 'text-white'} to="/about">about</Link>
            <Link className={status ? 'text-black' : 'text-white'} to="/contact">contact us</Link>
            <HiSearch size={25} className={status ? 'text-black' : 'text-white'} />
        </nav>

        <nav className='buttons'>
            <Link className={status ? 'text-black' : 'text-white'} to="/signin">sign in</Link>
            <Link className={status ? 'text-black' : 'text-white'} to="/signup">sign up</Link>
        </nav>
    </header>;
};
