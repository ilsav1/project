// Core
import React, { Component } from "react";

// Instruments
// import Styles from "./styles.m.css";
import Task from "../Task";

export default class TaskList extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        const { tasks, deleteTask, updateTask } = this.props;

        return (
            <ul className = { "" }>
                {tasks.map((task) => {
                    return (
                        <Task
                            completed = { task.completed }
                            deleteTask = { deleteTask }
                            favorite = { task.favorite }
                            id = { task.id }
                            key = { task.id }
                            message = { task.message }
                            updateTask = { updateTask }
                        />
                    );
                })}
            </ul>
        );
    }
}
