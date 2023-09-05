import Linkedin from '../../assets/images/linkedin.png';
import Github from '../../assets/images/github.png';
import { Body, Div } from './styles';

export default function Contato() {

    return (
        <Body>
            <Div>
                <div>
                    <a href="https://linkedin.com/in/leonardo-carvalho-3708bb260/" 
                    target="_blank" 
                    className="text-gray-400 hover:text-black" rel="noreferrer"
                    >
                        <img src={Linkedin} alt="linkedin" />
                        <strong>LinkedIn</strong>
                    </a>
                </div>

                <div>
                    <a href="https://github.com/Leonardo-tech-stack" 
                    target="_blank" 
                    className="text-gray-400 hover:text-black" rel="noreferrer"
                    >
                        <img src={Github} alt="github" />
                        <strong>Github</strong>
                    </a>
                </div>
            </Div>
        </Body>
    )
};