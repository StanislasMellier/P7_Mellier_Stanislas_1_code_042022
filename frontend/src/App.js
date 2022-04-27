import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import NotFoundPages from './pages/NotFoundPages';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Dev from './components/Dev';
function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route
						path='/'
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/user/:id' element={<User />} />
					<Route path='*' element={<NotFoundPages />} />
					<Route path='/dev' element={<Dev />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
