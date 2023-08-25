import React from "react";
import { Link } from 'react-router-dom';

export default function () {
    return <section className="gap-12 w-screen h-screen flex items-center justify-center flex-col relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-2/3 before:bg-black before:rounded-t-3xl">
        <h2 className="text-white text-center text-9xl font-black z-10">404</h2>
        <nav className="flex items-center justify-center gap-4 z-10 flex-wrap">
            <Link to='/' className="bg-white uppercase p-0.5 px-8 border-2 border-white rounded-full transition-all font-semibold">
                go home
            </Link>
            <Link to='/' className="text-white uppercase p-0.5 px-8 border-2 border-white rounded-full transition-all hover:bg-white hover:text-black font-semibold">
                contact us
            </Link>
        </nav>
    </section>;
};
