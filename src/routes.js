import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';
//import Horizon from './horizon-container';
//import Horizon from '@horizon/server';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Footer from './common/footer';
import Header from './common/header';
import Sidebar from './common/sidebar';

/* Pages */
import Home from './routes/Home';
import Homepage from './routes/Homepage';

import Dashboard from './routes/Dashboard';
import Maps from './routes/Maps';
import VehicleLocations from './routes/VehicleLocations';
import Locations from './routes/Locations';
import Routes from './routes/Routes';
import Vehicles from './routes/Vehicles';
import Members from './routes/Members';
import Schedules from './routes/Schedules';


import Login from './routes/Login';
import Signup from './routes/Signup';
import Lock from './routes/Lock';

/* Testing Components */
import Datatablesjs from './routes/Datatablesjs';

class App extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}

/**
 * Includes Sidebar, Header and Footer.
 */
const routes = (
  <Route component={App}>
      <Route path='dashboard' component={Dashboard} />
      <Route path='locations' component={Locations} />
      <Route path='routes' component={Routes} />
      <Route path='vehicles' component={Vehicles} />
      <Route path='members' component={Members} />
      <Route path='schedules' component={Schedules} />
      <Route path='vehicle-locations' component={VehicleLocations} />
      <Route path='tables/datatables' component={Datatablesjs} />
  </Route>
);

/**
 * No Sidebar, Header or Footer. Only the Body is rendered.
 */
const basicRoutes = (
  <Route>
    <Route path='lock' component={Lock} />
    <Route path='login' component={Login} />
    <Route path='signup' component={Signup} />
  </Route>
);

const combinedRoutes = (
  <Route>
    <Route>
      {routes}
    </Route>
    <Route>
      {basicRoutes}
    </Route>
  </Route>
);

export default (
  <Route>
    <Route path='/' component={Homepage} />

    <Route path='/ltr'>
      {combinedRoutes}
    </Route>
    <Route path='/rtl'>
      {combinedRoutes}
    </Route>
  </Route>
);
