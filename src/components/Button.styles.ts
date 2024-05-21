import styled, { css } from 'styled-components';

//export par poder acessar esa variável no Button.tsx
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps{
	variant: ButtonVariant;
}

const buttonVariant ={
	primary: 'purple',
	secondary: 'orange',
	danger: 'red',
	success: 'green'
}


//styled.button -> ele vi herdar todas as informações do button do html
export const ButtonContainer = styled.button<ButtonContainerProps>`
	width: 100px;
	height: 40px;
	
	${props =>{
		return `
			background-color:${buttonVariant[props.variant]}
		`
	}}
`
//${} - o que estiver aqui dentro, o styled components vai executar como uma função. E props são todas as propriedades passadas no <ButtonContainer> no arquivo Button.tsx - que tem o nome variant. Ou seja, props = variant