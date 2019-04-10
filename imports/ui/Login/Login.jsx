import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTracker } from 'meteor/react-meteor-data';
import Users from '../../api/users'
import Wrapper from '../Wrapper/Wrapper'
import '../assets/_main.scss';
import Sessions from '../../api/sessions';
import Activity from '../Activity/Activity';

class Login extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pid: '',
      ready: false,
      invalid: false,
      localUser: localStorage.getItem('pid'),
      preference: []
    };
  }


  // update the pid as the user types
  handleName(evt) {
    if (evt.target.value.length > 30) return;
    this.setState({
      name: evt.target.value
    });
  }

  // update the pid as the user types
  handleChange(evt) {
    if (evt.target.value.length > 9) return;
    this.setState({
      pid: evt.target.value
    });
  }

  getUserFromLocalStorage() {
    if (this.state.saved) {

    }
  }

  // TODO: use localStorage to suggest login
  login(evt) {
    evt.preventDefault();

    const { pid, name } = this.state;

    if (pid.length === 0 /*|| name.length === 0 || lastname.length === 0*/) return;

    // find user by pid on database
    const user = Users.findOne({pid});

    // user exists!
    if (user) {

      // user is already a participant in this session!
      // TODO: something went wrong.. i.e., refreshed
      if (this.props.session.participants.includes(pid)) {
        this.setState({
          ready: true
        });
        return;
      }

      // add user to session
      Sessions.update(this.props.session._id, {
        $push: {
          participants: pid
        }
      }, () => {
        this.setState({
          ready: true
        });
      });

    } else {
      Users.insert({
        name,
        pid,
        teammates: [],
        points: 0
      });
      // add user to session
      Sessions.update(this.props.session._id, {
        $push: {
          participants: pid
        }
      }, () => {
        this.setState({
          ready: true
        });
      });
    }    
  }

  // will alert the user that there pid is not valid
  renderUsernameTaken = () => {
    if (this.state.invalid) {
      return <p style={{color:"red"}}>That PID is invalid!</p>
    }
  }

  signup() {    
    const { code } = this.props.session;
    console.log(code);
    window.location = "/" + code + "/signup";
  }

  render() {

    // session not available yet TODO: return loading component
    if (!this.props.session) return "Loading...";

    const { ready } = this.state;

    const pid = this.state.pid; // || localStorage.getItem("pid");

    // user entered their name!
    // at this point, user is logged in!
    if (ready) {

      // get session_id
      const { _id, status } = this.props.session;

      // session is over...
      if (status === 2) return <div><h2>Thanks for participating! Please fill out <a href="https://forms.gle/ATh7tQC5LFf547h19">this survey</a>.</h2></div>

      return <Wrapper><Activity pid={pid} session_id={_id} /></Wrapper>
    }

    return (
      <Wrapper>
        <form id="pid-form" onSubmit={(evt) => this.login(evt)}>
          <div id="pid-container" className="field-container">
            {this.renderUsernameTaken()}
            <label className="field-title" htmlFor="name">What is your name? </label>
            <div className="input-container">
              <input className="input-text" type="text" name="name" placeholder="King Triton" value={this.state.name} onChange={(evt) => this.handleName(evt)}/>
            </div><br></br>
            <label className="field-title" htmlFor="pid">What is your PID?</label>
            <div className="input-container">
              <input className="input-text" type="text" name="pid" placeholder="A12345678" value={this.state.pid} onChange={(evt) => this.handleChange(evt)}/>
            </div>
            <input className="small-button" type="submit" value="Continue"/>
          </div>
        </form>
      </Wrapper>
    )
  }
}

export default withTracker((props) => {
  const session = Sessions.findOne({code: props.match.params.code});
  return { session }
})(Login);