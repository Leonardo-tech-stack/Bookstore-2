interface BoxProps {
    section: string;
    children: JSX.Element;
}

export default function Box(props: BoxProps) {
    return (
    <section className={`box ${props.section}`}>{props.children}</section>
    );
}