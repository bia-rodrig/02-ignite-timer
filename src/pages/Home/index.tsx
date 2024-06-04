import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' //integração específica para o zod
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useState } from 'react'

const newCycleFormValidationSchema = zod.object({
	//task: tem q ser uma string, ter o minimo de 1 caractere e a mensagem q o usuário vai receber, caso não atenda ao requisito minimo
	task: zod.string().min(1,'Informe a tarefa'),
	
	// minutesAmount -> tem que ser numero, minimo 5 e maximo 60
	minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos.').max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

//passa um objeto de configuração use form, que vai ser um schema, de como devem estar os dados
export function Home() {

	
  const { register, handleSubmit, watch} = useForm({
	resolver: zodResolver(newCycleFormValidationSchema)
  })

  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  
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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisable} type="submit">
          <Play />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
