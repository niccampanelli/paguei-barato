
export default interface CarregandoSkeletonProps {
    height?: number | string;
    children?: React.ReactChild | null;
    show?: boolean;
    width?: string | number;
    radius?: number | 'square' | 'round';
    backgroundColor?: string;
    colors?: string[];
    backgroundSize?: number;
    colorMode?: 'dark' | 'light';
    disableExitAnimation?: boolean;
    transition?: any;
}