import {ThemeProvider} from 'styled-components'
//o tema só vai ser aplicado pra os elementos que estiverem dentro do ThemeProvider
import { Button } from './components/Button'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
		<Button variant='primary'/>
		<Button variant='secondary'/>
		<Button variant='success'/>
		<Button variant='danger'/>
		<Button />
		<GlobalStyle />
	</ThemeProvider>
  )
}

