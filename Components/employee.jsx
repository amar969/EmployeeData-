import React from 'react'
import style from "./emp.module.css";

function Employee(){

    const [name, setName] = React.useState("")
    const [gender, setGender] = React.useState("")
    const [department, setDepartment] = React.useState("")
    const [role, setRole] = React.useState("")
    const [salary, setSalary] = React.useState("")

    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [isError, setIsError] = React.useState(false)

    const getEmployee = () => {
        setIsLoading(true)
        fetch(`http://localhost:3004/posts`)
        .then((res) => res.json())
        .then((res) => {
            setData(res)
        })
        .catch((err) => {
            setIsError(true)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const addEmployee = () => {
        const payload = {
            name, 
            gender,
            department,
            role,
            salary,
            status: false
        }
        setIsLoading(true)
        return fetch("http://localhost:3004/posts", {
            method:"POST",
            headers : {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((res) => {
            return getEmployee();
        })
        .catch((err) => {
            setIsError(true)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }


    return isLoading ? (<>
        ...loading
    </>) : isError ? (<>
        something went wrong
    </>) : (<>
        <h1> Employee Details</h1>
        <input 
        value={name}
        onChange={(e) => setName(e.target.value)}  
        placeholder='Enter your Name' /> 

        <input 
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder='Gender' /> 

        <input
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
         placeholder='Department' /> 
        
        <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
         placeholder='Role' /> 
        
        <input
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
         placeholder='Salary' /> 
        <button onClick={() => addEmployee(name)}>Add Employee</button>

        <br />
        <hr />
        <button onClick={getEmployee}>Show All department</button>
        
        <p>Show by Departments</p>
        <button>Show Marketing</button>
        <button>Show HR</button>
        <button >Show IT</button>
        <button>Show Finanace</button>

        <p>Sorting</p>
        <button>Sort by Salary Ascending</button>
        <button> Sort by Salary Descending</button>


        <ul className={style.Emp}>
            {data.map((item) => (
                <li className={style.empDetails} key={item.id}> {`${item.name} ${item.gender} ${item.department} ${item.role} ${item.salary} - ${item.status}`}</li>
            ))}
        </ul>
    </>)
}


export {Employee}