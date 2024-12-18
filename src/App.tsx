import { useEffect, useState } from 'react'
import './App.css'
import Task from './Task'
import _ from 'lodash'
// import axios from 'axios'
import taskConfig from "./task.json"

// const url = "https://raw.githubusercontent.com/web3devdex/task-manage/refs/heads/main/task.json"

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setTasks(_.map(taskConfig, Task.fromLevel1) || [])
  }

  console.log("tasks", tasks)

  return (
    <>
      <ul>
        {
          _.map(tasks, (task: Task) => {
            return <li>
              <a href={task.value}>{`${task.name} ${task.process}`}</a>
              <ul>
                {
                  _.map(task.items, (item: Task) => {
                    return <li>
                      <a href={item.value}>{`${item.name} ${item.process}`}</a>
                      <ul >
                        {
                          _.map(item.items, (row: Task) => {
                            return <li   >
                              {
                                row.status == true ? <span>(v)</span> : <span>...</span>
                              }
                              <a style={{ marginLeft: 10 }} href={row.value}>{row.name}</a>
                            </li>
                          })
                        }
                      </ul>
                    </li>
                  })
                }
              </ul>
            </li>
          })
        }
      </ul>
    </>
  )
}

export default App
