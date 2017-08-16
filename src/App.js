import React from 'react';
//import { AppRegistry, AsyncStorage, Navigator } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import Splash from './scenes/Splash';
import Login from './scenes/Login';
import PasswordReset from './scenes/PasswordReset';
import Registration from './scenes/Registration';
import Rules from './scenes/Rules';
import Slides from './scenes/Slides';
import Presentation_a from './scenes/Presentation_a';
import Presentation_c from './scenes/Presentation_c';
import SellerRegistration from './scenes/SellerRegistration';
import Statistics from './scenes/Statistics';
import Seller from './scenes/Seller';
import SellerEdit from './scenes/SellerEdit';
import Support from './scenes/Support';
import SupportOffer from './scenes/SupportOffer';
import SupportError from './scenes/SupportError';
import About from './scenes/About';
import Settings from './scenes/Settings';

import reducers from './reducers';

const ConnectedRouter = connect()(Router);
const store = createStore(reducers);

const App = () => (
	<Provider store={store}>
		<ConnectedRouter>
			<Scene key="root">
				<Scene key="splash"              component={Splash}             title="Splash"             hideNavBar={true} initial={true} />
				<Scene key="login"               component={Login}              title="Login"              hideNavBar={true} />
				<Scene key="passwordReset"       component={PasswordReset}      title="PasswordReset"      hideNavBar={true} />
				<Scene key="registration"        component={Registration}       title="Registration"       hideNavBar={true} />
				<Scene key="rules"               component={Rules}              title="Rules"              hideNavBar={true} />
				<Scene key="slides"              component={Slides}             title="Slides"             hideNavBar={true} />
				<Scene key="presentation_a"      component={Presentation_a}     title="Presentation_a"     hideNavBar={true} />
				<Scene key="presentation_c"      component={Presentation_c}     title="Presentation_c"     hideNavBar={true} />
				<Scene key="sellerRegistration"  component={SellerRegistration} title="SellerRegistration" hideNavBar={true} />
				<Scene key="statistics"          component={Statistics}         title="Statistics"         hideNavBar={true} />
				<Scene key="seller"              component={Seller}             title="Seller"             hideNavBar={true} />
				<Scene key="sellerEdit"          component={SellerEdit}         title="SellerEdit"         hideNavBar={true} />
				<Scene key="support"             component={Support}            title="Support"            hideNavBar={true} />
				<Scene key="supportOffer"        component={SupportOffer}       title="SupportOffer"       hideNavBar={true} />
				<Scene key="supportError"        component={SupportError}       title="SupportError"       hideNavBar={true} />
				<Scene key="about" 		           component={About}              title="About"              hideNavBar={true} />
				<Scene key="settings"            component={Settings}           title="Settings"           hideNavBar={true} />
			</Scene>
		</ConnectedRouter>
	</Provider>
);

export default App;
