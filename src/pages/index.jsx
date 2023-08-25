import React from 'react';
import $header from '../components/header';
import $banner from '../components/banner';
import $footer from '../components/footer';
import $portfolio from '../components/portfolio';

export default function () {
    return <>
        <$header />
        <$banner />
        <$portfolio />
        <$footer />
    </>;
};
