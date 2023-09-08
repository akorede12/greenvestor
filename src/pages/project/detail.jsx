import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { $banner } from '../../components/banner';

export default function () {
    const { id } = useParams();

    useEffect(() => {
    }, [id]);

    return <>
        <$banner />
    </>;
};
