import { ButtonContainer, ButtonVariant }from './Button.styles.ts'

interface ButtonProps{
	variant?: ButtonVariant
	//aqui a variant é opcional. no Button.styles não tem como ela ser opcional
}

export function Button({variant = 'primary'}: ButtonProps){
	//o nome variant pode ter qualquer nome
	return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}