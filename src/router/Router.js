import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import FlightDetails from '../pages/FlightDetails';
import NewFlight from '../pages/NewFlight';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import ResultFlights from '../pages/ResultFlights';
import ValidateReservation from '../pages/ValidateReservation';
import ValidateMail from '../pages/ValidateMail';

const Router = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/flight" element={<FlightDetails/>}/>
				<Route path="/newflight" element={<NewFlight/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/profile" element={<Profile/>}/>
				<Route path="/sign" element={<SignIn/>}/>
				<Route path='/resultflights' element={<ResultFlights/>}/>
				<Route path='/validatereservation' element={<ValidateReservation/>}/>
				<Route path="/validatemail" element={<ValidateMail/>}/>
			</Routes>
		</BrowserRouter>
	)
}

export default Router