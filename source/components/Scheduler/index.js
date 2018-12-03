// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";
import { api } from "../../REST";
import Header from "../Header";
import Footer from "../Footer";
import TaskCreator from "../TaskCreator";
import TaskList from "../TaskList";
import { sortTasksByGroup } from "../../instruments/helpers"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tasks:          [],
            messagePattern: "",
        };
    }
    componentDidMount () {
        api.fetchTasks().then((res) => {
            this.setState({
                tasks: res.data.data,
            });
        });
    }
    _deleteTask = (id) => {
        api.removeTask(id)
            .then((response) => response.data)
            .then(() => {
                this.setState({
                    tasks: this.state.tasks.filter((task) => task.id !== id),
                });
            });
    };
    _updateTask = (payload) => {
        api.updateTask(Array.isArray(payload) ? payload : [payload])
            .then((response) => response.data)
            .then((updatedTasks) => {
                const { tasks } = this.state;

                this.setState({
                    tasks: [...updatedTasks.data, ...tasks].filter(
                        (obj, pos, arr) => {
                            return (
                                arr
                                    .map((mapObj) => mapObj.id)
                                    .indexOf(obj.id) === pos
                            );
                        }
                    ),
                });
            });
    };
    _searchHandle = (e) => {
        this.setState({
            messagePattern: e.target.value,
        });
    };

    _completeAllTasks = () => {
        const tasks = this.state.tasks.map((task) => {
            task.completed = true;

            return task;
        });

        this._updateTask(tasks);
    };
    _createTask = (message) => {
        api.createTask({ message })
            .then((response) => response.data)
            .then((task) => {
                this.setState({
                    tasks: [...this.state.tasks, task.data],
                });
            });
    };
    render () {
        const { tasks, messagePattern } = this.state;

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Header searchHandle = { this._searchHandle } />
                    <section>
                        <TaskCreator createTask = { this._createTask } />
                        <TaskList
                            deleteTask = { this._deleteTask }
                            tasks = { sortTasksByGroup(tasks).filter((task) =>
                                task.message.includes(messagePattern)
                            ) }
                            updateTask = { this._updateTask }
                        />
                    </section>
                    <Footer
                        checked = { tasks.every((task) => task.completed) }
                        completeAllTasks = { this._completeAllTasks }
                    />
                </main>
            </section>
        );
    }
}
