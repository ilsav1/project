// Core
import React, { PureComponent } from "react";

// Instruments
// import Styles from "./styles.m.css";

export default class Header extends PureComponent {
    render () {
        const { searchHandle } = this.props;

        return (
            <header>
                <h1>Планировщик задач</h1>
                <input
                    onChange = { searchHandle }
                    placeholder = 'Поиск'
                    type = 'search'
                />
            </header>
        );
    }
}
