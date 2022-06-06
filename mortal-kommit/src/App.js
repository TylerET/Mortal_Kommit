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

const sliceDataRow1 = (props) => {
  return props.slice(0,5);
}

const sliceDataRow2 = (props) => {
  return props.slice(5);
}

function checkImg(url){

  if(url.avatar_url !== 'https://avatars.githubusercontent.com/u/66805711?v=4'){
    return (url.avatar_url);
  }
  return(testData[Math.floor(Math.random() * 8)].avatar_url);
};

//https://api.github.com/users/{userName}/repos
      //request repos from user and then iterate thru repos to check commits on each
//https://api.github.com/repos/{userName}/{Calculator}/commits
      //request commits which returns an array and sum the total number of commits.

      // for (let i = 0; i < resp.data.length; i++){
      //   console.log(resp.data[i].name);
      // }

      //check for author === username

const activePlayers = {p1: null, p2: null};

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      profiles: testData,
      // activePlayers : {p1: null, p2: null},
  };
  }



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
        <CardList profiles={this.state.profiles} active={this.state.activePlayers}/>
        <div className='player-container'>
          <PlayerOne profile={activePlayers.p1}/>
          <PlayerTwo profile={activePlayers.p2}/>
        </div>
        <Footer />
    </div>
  );
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
      <button>Add fighter</button>
    </form>
  );
}

}

const CardList = (props) => (
  <>
  <div className='row-wrapper-1'>
    {sliceDataRow1(props.profiles).map(profile => <Card key={profile.name}{...profile} active={props.active}/>)}
    </div>  
  <div className='row-wrapper-2'>
    {sliceDataRow2(props.profiles).map(profile => <Card key={profile.name}{...profile} active={props.active}/>)}
  </div>
  </>
);

class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playerState: 'noStatus',
    };  
    this.onClickFighter = this.onClickFighter.bind(this);
  }

  // activePlayers = props.state.active;

  


  onClickFighter = () => {
    // console.log('onClickFighter', );
    // console.log(this.state.playerState);
    // console.log((this.state.playerState === 'playerOne'));
    if (this.state.playerState === 'playerOne'){
      this.setState({playerState: 'noStatus'});
      activePlayers.p1 = null;
    }
    else if (this.state.playerState === 'playerTwo'){
      this.setState({playerState: 'noStatus'});
      activePlayers.p2 = null;
    }
    else {
      if (activePlayers.p1 == null)
      {
        this.setState({playerState: 'playerOne'});
        activePlayers.p1 = this.props;
      } else if(activePlayers.p2 == null)
      {
          this.setState({playerState: 'playerTwo'});
          activePlayers.p2 = this.props;
      } else {

      }
      console.table(activePlayers);
    }
  }

  stateStyle = {
    playerOne: "3px solid red",
    playerTwo: "3px solid LawnGreen",
    noStatus: "",
  };


  render () {
    const profile = this.props;
    return (
    <div className='github-profile' onClick={this.onClickFighter} style={{border: this.stateStyle[this.state.playerState]}}>
        {/* <img src={checkImg(profile)} /> */}
        <img src={profile.avatar_url}/>
        <div className='info'>
          <div className='name'></div>
          <div className='company'></div>
        </div>
    </div>
  )
  }
}

const PlayerOne = (props) =>{
  // console.log('PlayerOne', props.profile);
  // console.log('Log2', props.profile.avatar_url);
  if (props.playerState == 'playerOne'){
    return(<div className='activePlayer'></div>);
  } else {
    return(
    <div className="activePlayer">
      <Card {...props.profile}/>
    </div>);
  }
};

const PlayerTwo = (props) =>(
  <div>
    <img src={props.profile} ></img>
  </div>
);

const Footer = () => {
  return (
    <footer>
      <p>Credits: 0</p>
    </footer>
  )
}

export default App;
