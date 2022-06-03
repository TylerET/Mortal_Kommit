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

// const sliceDataRow1 = testData.slice(0,5);
// const sliceDataRow2 = testData.slice(5);
// console.table(sliceDataRow1);
// console.table(sliceDataRow2);

const sliceDataRow1 = (props) => {
  return props.slice(0,5);
}

const sliceDataRow2 = (props) => {
  return props.slice(5);
}



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
          //overrides native refresh during a submit
          // const resp = await axios.get(`https://api.github.com/users/${this.state.userName}/repos`);
          const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
          this.props.onSubmit(resp.data);
          
          // console.log(resp.data);

          // const repoNames = [];
          //     for (let i = 0; i < resp.data.length; i++){
          //       let repoName = resp.data[i].name;
          //       if(repoName !== 'LandingPage'){
          //     repoNames.push(repoName);}
          //   }
          // console.table(repoNames);

          var accum = 0;

        //   for (var name in repoNames){
        //     const resp2 = await axios.get(`https://api.github.com/repos/${this.state.userName}/${repoNames[name]}/commits`);
        //     accum += resp2.data.length;

        //     // console.log(resp2.data);
        //     console.log(accum);
        //     // console.log(repoNames[name]);
        //   }
        //   this.setState({ userName: ''});
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
    {sliceDataRow1(props.profiles).map(profile => <Card {...profile}/>)}
    </div>  
  <div className='row-wrapper-2'>
    {sliceDataRow2(props.profiles).map(profile => <Card {...profile}/>)}
  </div>
  </>
);

const PlayerOne = (props) =>(
    <div>
      <img src={props.profile}></img>
    </div>
);

const PlayerTwo = (props) =>(
  <div>
    <img src={props.profile}></img>
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
      <h1>Mortal Kommit</h1>
      <h2>Choose Your Fighter</h2>
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
      
  function changeSize (e){
    e.target.style.color = 'red';
    console.log('On mouse Over!!!')
  }


class App extends React.Component {

  state = {
    profiles: testData, playerOne: '', playerTwo: '',
  };

  addNewProfile = (profileData) => {

        if (this.state.profiles.length >= 10){
          this.state.profiles.pop();
        }

        this.setState(prevState => ({
          // profiles: [profileData, ...prevState.profiles]
          profiles: [...prevState.profiles, profileData]
        }))
        // this.state.profiles.pop();
      };

        
        
        


  render(){
  return (
    <div  className='container'> 
        <Title />
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
        <div className='player-container'>
          <PlayerOne profile="/img/SubZero.png"/>
          <PlayerTwo profile="/img/Scorpion.png"/>
        </div>
        <Footer />
    </div>
  );
}
}

export default App;
