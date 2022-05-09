import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFoundPages from './pages/NotFoundPages';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

import AuthContextProvider from './Context/AuthContext';
function App() {
	return (
		<>
			<Router>
				<AuthContextProvider>
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
						<Route path='*' element={<NotFoundPages />} />
					</Routes>
				</AuthContextProvider>
			</Router>
		</>
	);
}

export default App;
