import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// route components
import Landing from '../../ui/Landing/Landing';
import InstructorUI from '../../ui/InstructorUI/InstructorUI';
import Session from '../../ui/Session/Session';
import SessionProgress from '../../ui/SessionProgress/SessionProgress';
import ActivityHandler from '../../ui/Handlers/ActivityHandler/ActivityHandler';
import SessionHandler from '../../ui/Handlers/SessionHandler/SessionHandler';
import TextBox from '../../ui/Components/TextBox/TextBox.jsx'; 
import Loading from '../../ui/Components/Loading/Loading.jsx'; 
import Waiting from '../../ui/Components/Waiting/Waiting.jsx'; 
import Survey from '../../ui/Components/Survey/Survey.jsx'; 

export const renderRoutes = () => (
    <Router>
      <div>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/vivian" render={(props) => <TextBox {...props} color={'black'} label={'TWO TRUTHS'}>
            hello</TextBox>}/>
            {/* <Route exact path="/vivian" render={(props) => <Survey></Survey>}/> */}
            <Route exact path="/instructor" component={InstructorUI} />
            <Route exact path="/sandbox" render={(props) => <ActivityHandler {...props}
              pid={'gus'}
              progress={2}
              activity_id={"abcd"}/>}
            />
            <Route exact path="/:code" component={SessionHandler} />
            <Route exact path="/:code/edit" component={Session} />
            <Route exact path="/:code/view" component={SessionProgress} />
        </Switch>
      </div>
    </Router>
);
