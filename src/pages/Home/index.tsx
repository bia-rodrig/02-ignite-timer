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

// não foi dado o nome de formValidationScheme, pois se tiver mais de um formulario na página, vai ter q renomear a const
//schema - definir um formato e validar os dados do formulário com base nesse schema
const newCycleFormValidationSchema = zod.object({
	// tem q ter no minimo 1 caractere e qual a mensagem que vai retornar ao usuário, caso não atenda ao requisito
	task: zod.string().min(1,'Informe a tarefa'),
	minutesAmount: zod.number().min(5).max(60)
})


export function Home() {
	// passa um objeto de configuraçãoes pro useForm
  const { register, handleSubmit, watch } = useForm({
	// passar para o zodResolver o schema de validação -> de que forma quer validar os dados dos inputs -> regras de validação - pra isso cria a const newCycleFormValidationSchema
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
