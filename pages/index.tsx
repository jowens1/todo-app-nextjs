import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Container from '../components/container'
import Card from '../components/card'
import TodoList from '../components/todoList'
import TodoForm from '../components/todoForm'
import Todo, { genericTodo, TodoKeys } from '../types/Todo'
import { updateArray, removeItem } from '../utils/util'

const Home: NextPage = () => {
  const [todos, setTodos] = useState([genericTodo])

  const handleCreate = (todo: Todo) =>  setTodos([...todos, todo])

  const handleEdit = (id: number, editedAction: string) => setTodos(updateArray({
    array: todos,
    testKey: TodoKeys.ID,
    testValue: id,
    updateKey: TodoKeys.ACTION,
    updateValue: editedAction
  }))

  const handleComplete = (id: number, isCompleted: boolean) => setTodos(updateArray({
      array: todos,
      testKey: TodoKeys.ID,
      testValue: id,
      updateKey: TodoKeys.COMPLETED,
      updateValue: isCompleted
    }))

  const handleCopy = (todo: Todo) => setTodos([...todos, todo])

  const handleDelete = (todo: Todo) => setTodos([...removeItem(todos, todo)])

  return (
    <div className="flex min-h-screen flex-col items-center pt-4 bg-blue-100">
      <Head>
        <title>My First Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Card>
          <TodoForm submit={handleCreate}/>
        </Card>
        <Card>
          <TodoList todos={todos} complete={handleComplete} edit={handleEdit} copy={handleCopy} remove={handleDelete} />
        </Card>
      </Container>
    </div>
  )
}

export default Home
