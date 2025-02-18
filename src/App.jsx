import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todoList, setTodoList] = useState([])
  const [showfinished, setShowfinished] = useState(true)

  useEffect(() => {
    let LSdata = JSON.parse(localStorage.getItem("todos"))
    setTodoList(LSdata)
    const keys = Object.keys(localStorage);
    console.log(keys);
  }, [])

  const handleEnterBtn = (e) =>{
    e.key == "Enter" && handleAdd()
  }

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todoList))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    if (todo.trim() === "")
      return;
    setTodoList([...todoList, { id: uuidv4(), todo: todo, isCompleted: false }])
    setTodo("")
    saveToLocalStorage()
  }

  const handleCheckbox = (e) =>{ 
    let id = e.target.name;
    let index = todoList.findIndex((item) =>{
      return item.id ==id;
    })
    let newTodoList = [...todoList]
    newTodoList[index].isCompleted = newTodoList[index].isCompleted?false:true;
    setTodoList(newTodoList)
    // addToCompletedList()
    saveToLocalStorage();
  }

  const handleEdit = (e, id) => {
    let todo = (todoList[todoList.findIndex((todo) => { return todo.id == id })].todo)
    setTodo(todo)
    handleDelete(e, id)
    saveToLocalStorage()
  }

  const handleDelete = (e, id) => {
    let index = todoList.findIndex((item) => {
      return item.id == id;
    })
    let newTodoList = [...todoList]
    newTodoList.splice(index, 1)
    setTodoList(newTodoList)
    saveToLocalStorage()
  }

  const toggleFinished = () =>{
    setShowfinished(!showfinished)
  }
  
  const addTasks = () => {
    return todoList.map((item) => {
      return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex cursor-pointer items-center justify-between rounded-md p-2 transition-all duration-200 hover:bg-slate-200">
        <div className="todoLeft flex items-center gap-2">
          <input checked={item.isCompleted ? true : false} type="checkbox" name={item.id} onChange={handleCheckbox} />
          <p className={`text-sm text-gray-700 ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</p>
        </div>
        <div className="todoRight flex items-center gap-2">
          <button onClick={(e) => { handleEdit(e, item.id) }} className='rounded-md bg-purple-700 p-1'>
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21H12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={(e) => { handleDelete(e, item.id) }} className='rounded-md bg-purple-700 p-1'>
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 11V17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M14 11V17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M4 7H20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>

        </div>
      </div>
    })
  }


  return (
    <>
      <div className="maincont mx-auto flex h-screen flex-col p-6 tab:my-[5vh] tab:h-[90vh] tab:w-4/5 1100:w-5/12 770:w-3/5 ">
        <h1 className='mb-3 text-center text-xl font-bold text-gray-700'>ToDo'er - Manage your TODOs at one place</h1>

        <h2 className='text-l p-2 font-bold text-gray-700'>Add a ToDo</h2>
        <div className="addTodo flex rounded-md border border-gray-700">
          <input className='w-full border-none bg-transparent px-2 py-1 text-sm focus:outline-none' type="text" name='todo' value={todo} onChange={handleChange} onKeyDown={(e) =>{handleEnterBtn(e)}}/>
          <button className='bg-purple-700 px-2 text-white' onClick={handleAdd}>Save</button>
        </div>
        <div className='m-2 mt-4 text-gray-700' > <input type="checkbox"  checked={showfinished} id="showFinished" onChange={toggleFinished}/> <label htmlFor="showFinished" className='select-none'>Show Finished</label> </div>
        <h2 className='text-l mb-1 px-2 font-bold text-gray-700'>Your ToDo's</h2>
        <div className="todoShow grow overflow-y-auto">
          {addTasks()}
          {/* {addCompletedTasks()} */}
        </div>

      </div>
    </>
  )
}

export default App
