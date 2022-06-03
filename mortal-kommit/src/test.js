class Form extends React.Component {
    state = { userName: ''};
    handleSubmit = async (event) => {
      event.preventDefault();
      const resp = await axios.get(`https://api.github.com/users/${this.state.userName}/repos`);
      this.props.onSubmit(resp.data);
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
          // console.log(resp2.data);
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