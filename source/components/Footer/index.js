// Core
import React, { PureComponent } from "react";

// Instruments
import Styles from "../Scheduler/styles.m.css";

import Checkbox from "../../theme/assets/Checkbox";

export default class Footer extends PureComponent {
    render () {
        const { checked, completeAllTasks } = this.props;

        return (
            <footer>
                <Checkbox
                    checked = { checked }
                    className = { Styles.completeAllTasks }
                    color1 = '#3B8EF3'
                    color2 = '#FFF'
                    onClick = { completeAllTasks }
                />
                <span>Все задачи выполнены</span>
            </footer>
        );
    }
}
