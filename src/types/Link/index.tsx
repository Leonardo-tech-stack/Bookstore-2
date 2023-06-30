import { Link as LinkRoute } from "react-router-dom";

interface LinkProps {
    texto: string;
    redirect: string;
    className?:string;
}

export default function Link(props: LinkProps) {

    return (
        <LinkRoute className={props.className} 
            to={props.redirect}    
            rel="noreferrer">
            {props.texto}
        </LinkRoute>
    );
}