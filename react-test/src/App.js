import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      hovered:false,
      count:999,
      liked:false,
      txt:"this is state txt"
    }

  }

  propTypes = {
    txt:React.PropTypes.string
  }
  defaultProps = {
    txt:"this is the default"
  }
  update(e){
    this.setState({txt:e.target.value})
  }
  onMouseEnter(){
    this.setState({hovered:true});
  }
  onMouseLeave(){
    this.setState({hovered:false});
  }

  onClick(){
    this.setState({

        count:this.state.count+(this.state.liked?-1:1),
        liked:!this.state.liked
    });
  }

  //viewするためのコンポネント設計

  render(){
    const likeClass = this.state.hovered ? "like likeHover":"like";
    let txt = this.props.txt;
    console.log(this.state);
    console.log(this.props);
    //これらを結びつけられたrootにレンダリングするよ～。
    return(

      <span className="container">
        <span 
         onMouseEnter={this.onMouseEnter.bind(this)}
         onMouseLeave={this.onMouseLeave.bind(this)} 
         onClick={this.onClick.bind(this)}
         className={likeClass}>{this.state.liked?"✔" : ""}いいね</span>
        <span className="counter">
        <span className="counterBefore">{" "}</span>
        {this.state.count}
        <input type="text" onChange={this.update.bind(this)} />
        <h2>{this.state.txt}</h2>
        <p>{txt}</p>
        </span>
      </span>

      );
  }
}



export default App;