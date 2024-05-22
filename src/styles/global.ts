import { createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	//coloca todo css que seja global
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:focus{
		outline: 0;
		/* 0 de x, 0 de y e 0 de blue e 2px de tamanho com a cor verde */
		box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
	}

	body{
		background: ${props => props.theme['gray-900']};
		color: ${props => props.theme['gray-300']};
	}

	body, input, textarea, button{
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 1rem;
	}
`;
