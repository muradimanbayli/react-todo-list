

const rootElement = document.getElementById('root')

class Header extends React.Component {
  render() {
    return(
      <div className="header">
          <h1>{this.props.title}</h1>
      </div>
    );
  }
}

class TodoElement extends React.Component{
    constructor(props){
      super(props);
      this.saveElement=this.saveElement.bind(this);
      this.handler = this.handler.bind(this);
      this.state = {name : this.props.todoName};
      this.setStatus = this.setStatus.bind(this);

    }

    componentWillReceiveProps(){
      this.setState({ name: this.props.todoName });
    }

    editElement(){
      this.props.edit(this.props.index);
    }

    saveElement(e){
       let mainElement = e.target.parentElement.parentElement.parentElement;
       let newValue = mainElement.getElementsByClassName("todo-edit")[0].value;
       this.props.save(newValue,this.props.index);
    }

    deleteElement(e){
      this.props.delete(this.props.index);
    }

    setStatus(){
      this.props.setStatus(this.props.todoStatus,this.props.index);
    }

    handler(e){
      this.setState({ name: e.target.value });
    }

    render(){
      let editElement;
      let saveOrEdit;

      if(this.props.todoIsEdit){
        editElement = <input onChange={this.handler} className="todo-edit" type="text" value={this.state.name}/>;
        saveOrEdit = <div onClick={this.saveElement}><img src="resources/images/save.png"/></div>;
      }else{
        editElement = <div>{this.props.todoName}</div>;
        saveOrEdit = <div onClick={(e) => this.editElement(this)}><img src="resources/images/edit.png"/></div>;
      }

      return(
        <li>
            <div className="text">{editElement}</div>
            <div className="status">
                <span onClick={this.setStatus} className={this.props.todoStatus}/>
            </div>
            <div className="action">
              {saveOrEdit}
              <div onClick={(e) => this.deleteElement(this)} ><img src="resources/images/delete.png"/></div>
            </div>
            <div className="clear" ></div>
        </li>
      );
    }
}

class TodoNew extends React.Component{

    addElement(){
      let input = document.getElementById("newTodo");
      let vname = input.value;
      let todoObject={name:vname,status:"uncompleted",isEdit:false};
      this.props.add(todoObject);
      input.value = '';
    }

    render(){
      return(
        <div className="add-element">
            <input id="newTodo" type="text" placeholder="new todo"/>
            <input type="button" onClick={(e) => this.addElement(this)} value="+"/>
        </div>
      );
    }
}

class Todo extends React.Component {
  constructor(){
    super();
  }
  render(){
    const todos=this.props.tasks.map((e,i) => {
        return(
          <TodoElement delete={this.props.delete}
                       edit={this.props.edit}
                       save={this.props.save}
                       setStatus={this.props.setStatus}
                       todoName={e.name}
                       todoStatus={e.status}
                       index={i}
                       todoIsEdit={e.isEdit}/>
        )
    });
    return(
      <div className="todo">
          <TodoNew add={this.props.add}/>
          <div className="todo-list">
              <ul>
                  {todos}
              </ul>
          </div>
      </div>
    );
  }
}
class Footer extends React.Component {
  render(){
    return(
      <div className="footer">
          Made by <a href="{this.props.url}">{this.props.developer}</a> | Copyright (c) 2018 All Rights Reserved.
      </div>
    );
  }
}
class App extends React.Component {
  constructor(){
    super();
    const firstTemp = [
      {name:"todo 1",status:"completed",isEdit:false},
      {name:"todo 2",status:"uncompleted",isEdit:true},
      {name:"todo 3",status:"completed",isEdit:false}
    ];
    this.state = {tasks:firstTemp};
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  setStatus(newStatus,index){
      let tempStatus = newStatus == 'completed' ? 'uncompleted' : 'completed';
      let temp=this.state.tasks;
      temp[index].status = tempStatus;
      this.setState({tasks:temp});
  }

  save(newValue,index){
    let temp=this.state.tasks;
    temp[index].isEdit = false;
    temp[index].name = newValue;
    this.setState({tasks:temp});
  }

  add(object){
    let temp=this.state.tasks;
    temp.push(object);
    this.setState({tasks:temp});
  }

  delete(index){
    console.log(this.state.tasks);
    let temp=this.state.tasks;
    temp.splice(index, 1);
    this.setState({tasks:temp});
    console.log(this.state.tasks);
  }

  edit(index){
    console.log(index);
    let temp=this.state.tasks; console.log(temp[index]);
    temp[index].isEdit = true;
    this.setState({tasks:temp});
  }

  render(){
    return(
      <div>
        <Header title="Todo Web application for Bene Studio"/>
        <Todo tasks={this.state.tasks}
              delete={this.delete}
              add={this.add}
              edit={this.edit}
              save={this.save}
              setStatus={this.setStatus} />
        <Footer url="www.imanbayli.net" developer="Murad Imanbayli"/>
      </div>
    );
  }
}


ReactDOM.render(<App/>,rootElement)
