import { useState } from 'react'
import './App.css'
import taskJson from "./task.json"
import Task from './Task'
import _ from 'lodash'

const taskJsonList: Task[] = _.map(taskJson, Task.fromLevel1) || []

function App() {
  const [tasks] = useState<Task[]>(taskJsonList)

  console.log("tasks", tasks)

  return (
    <>
      <ul>
        {
          _.map(tasks, (task: Task) => {
            return <li>
              <a href={task.value}>{task.name}</a>
              <ul>
                {
                  _.map(task.items, (item: Task) => {
                    return <li>
                      <a href={item.value}>{item.name}</a>
                      <ul >
                        {
                          _.map(item.items, (row: Task) => {
                            return <li   >
                              {
                                row.status == true ? <span>(v)</span> : <span>...</span>
                              }
                              <a style={{marginLeft: 10}} href={row.value}>{row.name}</a>
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
