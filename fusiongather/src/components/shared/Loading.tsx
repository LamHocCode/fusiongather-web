import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

interface LoadingProps {
    type: LoadingType | undefined;
    height?: LoadingType | number | string
    width?: LoadingType | number | string
}
const Loading = ({ type, height, width }: LoadingProps) => (
    <ReactLoading height={height} width={width} color="#FF8E3C" type={type} />
);

export default Loading;