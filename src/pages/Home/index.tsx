import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),

  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // armazena a quantidade de segundos que já passaram desde que o ciclo iniciou
  // totalSeconds menos o total de segundos que já passou, pra ter quantos ainda faltam.
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // converte os minutos inseridos pelo usuário em segundos.
  // quando a pessoa da o F5 na página, fica com nenhum ciclo ativo.
  // então por isso só converte se tiver um activeCyle.
  // se tiver um ciclo ativo, converte o minutes amount para segundas. Se não tiver, o totalSeconds é zero
  const totalSeconds = activeCycle ? activeCycle?.minutesAmount * 60 : 0

  // se tiver um activeCycle, pega o total de segundos e subtrai os segundos que já passaram
  // senão, é zero
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // converter currentSeconds de uma maneira que consiga exibir em tela (minutos:segundos)
  // calcular dos segundos que já passaram, o total de minutos
  const minutesAmount = Math.floor(currentSeconds / 60) // arredonda pra baixo a divisão
  // .floor -> chão, arredonda pra baixo
  // .ceil -> arredonda pra cima
  // .round -> .5 pra cima, arredonda pra cima. .5 pra baixo, arredonda pra baixo

  const secondsAmount = currentSeconds % 60 // pega o resto da divisão, pra pegar a quantidade de segundos

  // converte o minutesAmount para string para poder separar os digítos
  // padStart -> preenche o tamanho de uma string com determinados caracteres
  // deve ter 2 caracteres, se não tiver, preencher com 0 no start da string
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisable = !task
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto."
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisable} type="submit">
          <Play />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
