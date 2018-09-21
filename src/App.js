import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

var taskList = [
  {
    id: 1,
    title: "Task 0",
    done: false
  },
  {
    id: 2,
    title: "Task 1",
    done: false
  },
  {
    id: 3,
    title: "Task 2",
    done: false
  },
  {
    id: 4,
    title: "Task 3",
    done: false
  }
];

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { tasksState: props.tasks };
  }

  handleTaskToggle(idToggle, doneToggle) {
    var newTasksState = this.state.tasksState.map(task => {
      if (task.id === idToggle) {
        return { id: task.id, title: task.title, done: doneToggle };
      } else {
        return { id: task.id, title: task.title, done: task.done };
      }
    });

    this.setState({ tasksState: newTasksState });
  }

  handleTaskChange(idChange, titleChange) {
    var newTasksState = this.state.tasksState.map(task => {
      if (task.id === idChange) {
        return { id: task.id, title: titleChange, done: task.done };
      } else {
        return { id: task.id, title: task.title, done: task.done };
      }
    });

    this.setState({ tasksState: newTasksState });
  }

  // doesn't work
  handleTaskDelete(idDelete) {
    // var newTasksState = update(this.state.tasksState, {
    //   $splice: [idDelete, 1]
    // });

    var newTasksState = this.state.tasksState.splice(idDelete, 1);

    this.setState({ tasksState: newTasksState });
  }

  // doesn't work
  handleTaskAdd() {
    // var newTasksState = update(this.state.tasksState, {
    //   $push: [{ id: 5, title: "New task", done: false }]
    // });

    var newTasksState = this.state.tasksState.concat({
      id: 5,
      title: "New task",
      done: false
    });

    this.setState({ tasksState: newTasksState });
  }

  render() {
    var tasks_todo = this.state.tasksState.map(task => {
      if (!task.done) {
        return (
          <Task
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={this.handleTaskToggle.bind(this)}
            onChange={this.handleTaskChange.bind(this)}
            onDelete={this.handleTaskDelete.bind(this)}
          />
        );
      }
    });

    var tasks_done = this.state.tasksState.map(task => {
      if (task.done) {
        return (
          <Task
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={this.handleTaskToggle.bind(this)}
            onChange={this.handleTaskChange.bind(this)}
            onDelete={this.handleTaskDelete.bind(this)}
          />
        );
      }
    });

    return (
      <div>
        <div className="list">
          <a href="" className="task-add" onClick={this.handleTaskAdd}>
            +
          </a>
          <div className="header">list-to-do</div>
          {tasks_todo}
        </div>
        <div className="list">
          <div className="header">done</div>
          {tasks_done}
        </div>
      </div>
    );
  }
}

class Task extends Component {
  handleToggle() {
    this.props.onToggle(this.props.id, !this.props.done);
  }

  handleChange(event) {
    this.props.onChange(this.props.id, event.target.value);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    var check_input = (
      <input
        className="check"
        type="checkbox"
        defaultChecked={this.props.done}
        onClick={this.handleToggle.bind(this)}
      />
    );
    var task_style = !this.props.done ? "task todo" : "task done";

    return (
      <div className={task_style}>
        <a
          href=""
          className="task-delete"
          onClick={this.handleDelete.bind(this)}
        >
          x
        </a>
        {check_input}
        <input
          className="task-title"
          type="text"
          value={this.props.title}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

class Card extends Component {
  render() {
    return (
      <div className="card">
        <List tasks={this.props.taskList} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Card taskList={taskList} />
      </div>
    );
  }
}

export default App;
