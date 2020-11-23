import "./App.scss";
import Header from "./Components/Header/Header";
import Helper from "./Components/Helper/Helper";
import Show_work from "./Components/Show_work/Show-work";
import { PureComponent } from "react";

class App extends PureComponent {
  state = {
    Todos: [],
    Dones: [],
  };
  sendthis = (inputvalue) => {
    if (inputvalue === undefined) {
      return this;
    }
    const Todos = this.state.Todos;

    this.setState({
      Todos: Todos.concat(inputvalue),
    });
  };

  render() {
    const { Todos , Dones } = this.state;
    return (
      <div>
        <Header />
        <Helper sendthis={this.sendthis} />
        <Show_work Todos={Todos} Dones={Dones} sendthis={this.sendthis} />
      </div>
    );
  }
}

export default App;
