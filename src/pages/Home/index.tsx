import { Play } from 'phosphor-react'
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

export function Home() {
  function handleSubmit(event) {
    // usar JS para buscar os valores dos inputs -> teria que dar nome aos inputs
    const valor = event.target.task.value
    // dessa maneira não tem a fluidez, de monitorar os inputs pra habilitar ou não o botão.
    // porém ganha em performance, já que o como controlled exige mais processamento
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            name="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto."
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

        <StartCountdownButton disabled={!task} type="submit">
          <Play />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
