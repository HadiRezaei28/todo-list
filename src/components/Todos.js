import React, { useState } from 'react';
import { FaPlusSquare, FaAngleDown, FaCheck, FaTrash } from "react-icons/fa";
import styles from "./Todos.module.css";


const Todos = () => {

    const [value, setValue] = useState("");
    const [todos, setTodos] = useState([]);

    const clickHandler = (e) => {
        e.preventDefault();
        setTodos([...todos, { todo: value, check: false }]);
        setValue("");
    }
    console.log(todos)
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
                    <select className={styles.filtertodo}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                    {/* <span><FaAngleDown /></span> */}
                </div>
            </form>
            <main>
                {todos.map((item, index) => {
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