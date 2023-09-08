import { } from 'react';
import { $search } from '../../components/forms';
import $featured from '../../components/project';
import $projects from '../../components/projects';

export default function () {
    return <>
        <$search title='Explore a World of Sustainable Impact' />
        <$featured title='Featured Projects' className='px-[10%]' />
        <$projects />
    </>;
};
