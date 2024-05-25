import 'styled-components'
import { defaultTheme } from '../styles/themes/default'
// themetype pode ser qualquer nome
type ThemeType = typeof defaultTheme // ThemeType é do tipo defaultTheme

// o declare modulo, está criando uma tipagem pro módulo styled-components
// toda vez que voê importar o styled-components, a tipagem que ele vai puxar, é o que é definido aqui dentro
// está sobrescrevendo o styled-components que foi importado na linha 1
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
  // sobrescreve a DefaultTheme da biblioteca importada
}
