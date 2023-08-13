import './style.sass';
import React from "react";

export default function () {
    return <footer className="w-full p-8 flex flex-col bg-black mt-4">
        <div className={`${styles.common}`}></div>
        <div className={`${styles.common}`}></div>
    </footer>;
};

const styles = {
    common: 'w-full items-center justify-between'
};