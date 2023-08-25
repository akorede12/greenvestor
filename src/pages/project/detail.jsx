import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function () {
    const { id } = useParams();

    useEffect(() => {
    }, [id]);

    return <></>;
};
