import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const testData = [
  {name: "Johnny Cage", avatar_url: "/img/Johnny-Cage.png"},
  {name: "Kano", avatar_url: "/img/Kano.png"},
  {name: "Logo", avatar_url: "/img/logo.png"},
  {name: "SubZero", avatar_url: "/img/SubZero.png"},
  {name: "Sonya Blade", avatar_url: "/img/Sonya-Blade.png"},
  {name: "Raiden", avatar_url: "/img/Raiden.png"},
  {name: "Liu Kang", avatar_url: "/img/Liu-Kang.png"},
  {name: "Scorpion", avatar_url: "/img/Scorpion.png"},
];

const sliceDataRow1 = testData.slice(0,5);
const sliceDataRow2 = testData.slice(5);
// console.table(sliceDataRow1);
// console.table(sliceDataRow2);




//Card
//Card List
//Form

//https://api.github.com/users/{userName}/repos
      //request repos from user and then iterate thru repos to check commits on each
//https://api.github.com/repos/{userName}/{Calculator}/commits
      //request commits which returns an array and sum the total number of commits.

      // for (let i = 0; i < resp.data.length; i++){
      //   console.log(resp.data[i].name);
      // }

      //check for author === username

//If no profile picture = choose random MK

      class Form extends React.Component {
        state = { userName: ''};
        handleSubmit = async (event) => {
          event.preventDefault();
          const resp = await axios.get(`https://api.github.com/users/${this.state.userName}/repos`);
          // this.props.onSubmit(resp.data);
          // this.setState({ userName: ''});
          console.log(resp.data);
          const repoNames = [];
              for (let i = 0; i < resp.data.length; i++){
              repoNames.push(resp.data[i].name);
            }
          console.table(repoNames);
          var accum = 0;
          for (var name in repoNames){
            const resp2 = await axios.get(`https://api.github.com/repos/${this.state.userName}/${repoNames[name]}/commits`);
            accum += resp2.data.length;
            console.log(resp2.data);
            console.log(accum);
            // console.log(repoNames[name]);
          }
        };
        render() {
          return (
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                value={this.state.userName}
                onChange={event => this.setState({ userName: event.target.value })}
                placeholder="GitHub username" 
                required 
              />
              <button>Add card</button>
            </form>
          );
        }
      }

const CardList = (props) => (

  <>
  <div className='row-wrapper-1'>
    {sliceDataRow1.map(profile => <Card {...profile}/>)}
    </div>  
  <div className='row-wrapper-2'>
    {sliceDataRow2.map(profile => <Card {...profile}/>)}
  </div>
  </>

  // return (
  // <>
  // {/* <div className='row-wrapper-1'> */}
  //   <Card name='1'/>
  //   <Card name='2'/>
  //   <Card className ='input' name='3'/>
  //   <Card name='4'/>
  //   <Card name='5'/>
  // {/* </div> */}
  // {/* <div className='row-wrapper-2'> */}
  //   <Card name='6'/>
  //   <Card name='7'/>
  //   <Card name='8'/>
  // {/* </div> */}
  // </>
  // )
);

const PlayerOne = (props) =>(
    <div>
      <img src="/img/Johnny-Cage.png"></img>
    </div>
);

const PlayerTwo = (props) =>(
  <div>
    <img src="/img/Raiden.png"></img>
  </div>
);



class Card extends React.Component {

  render () {
    const profile = this.props;
    return (
    <div className='github-profile'>
        <img src={profile.avatar_url}/>
        <div className='info'>
          <div className='name'></div>
          <div className='company'></div>
        </div>
    </div>
  )
  }
}


const Title = () => {
  return (
    <header>
      <h1>Choose Your Fighter</h1>
    </header>
  )
}
  
  const Footer = () => {
    return (
      <footer>
        <p>Credits: 0</p>
      </footer>
    )
  }

const Container = () => {
  return(
    <div  className='container'> 
        <Title />
        <Form />
        <CardList/>
        <div className='player-container'>
          <PlayerOne/>
          <PlayerTwo/>
        </div>
        <Footer/>
    </div>
  )
}
      



class App extends React.Component {

  render(){
  return (
    <Container/>
  );
}
}

export default App;
