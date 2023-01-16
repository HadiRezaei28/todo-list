import React, { useEffect, useState } from 'react';
import { FaPlusSquare, FaAngleDown, FaCheck, FaTrash } from "react-icons/fa";
import styles from "./Todos.module.css";


const getLocalStorage = () => {
    const get = JSON.parse(localStorage.getItem("todos"));
    if(get){
        return get
    } else {
        return []
    }
}

const Todos = () => {

    const [value, setValue] = useState("");
    const [todos, setTodos] = useState(getLocalStorage());
    const [filter, setFilter] = useState("all");
    const [filtertodos, setFiltertodos] = useState(todos);

    useEffect(() => {
        if (filter === "all") {
            setFiltertodos(todos)
        }
        if (filter === "completed") {
            const completedTodos = todos.filter(item => item.check === true);
            setFiltertodos(completedTodos)
        }
        if (filter === "uncompleted") {
            const uncompletedTodoes = todos.filter(item => item.check === false);
            setFiltertodos(uncompletedTodoes);
        }

        localStorage.setItem("todos" , JSON.stringify(todos));
    },[todos, filter])

    const clickHandler = (e) => {
        e.preventDefault();
        setTodos([...todos, { todo: value, check: false }]);
        setValue("");
    }

    const remove = (item) => {
        if (window.confirm("Are you sure?")) {
            const filtertodos = todos.filter(work => work.todo !== item);
            setTodos(filtertodos);
        }
    }

    const done = (item, index) => {
        const duplicateTodos = [...todos];
        duplicateTodos[index] = {
            todo: item,
            check: !todos[index].check
        }
        setTodos(duplicateTodos);
    }

    const filterHandler = e => {
        setFilter(e.target.value);
    }

    return (
        <div className={styles.container}>
            <header>
                <h1>Todo List</h1>
            </header>
            <form >
                <div className={styles.input}>
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button type='submit' onClick={clickHandler}><FaPlusSquare /></button>
                </div>
                <div className={styles.select}>
                    <select onClick={(e) => filterHandler(e)} className={styles.filtertodo}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>
            <main>
                {filtertodos.map((item, index) => {
                    return (
                        <div className={item.check ? styles.done : styles.todo} key={index}>
                            <span className={styles.one}>{item.todo}</span>
                            <span className={styles.two} onClick={() => done(item.todo, index)}><FaCheck /></span>
                            <span className={styles.three} onClick={() => remove(item.todo)}><FaTrash /></span>
                        </div>
                    )
                })}
            </main>
        </div>
    );
};

export default Todos;