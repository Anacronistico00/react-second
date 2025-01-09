import RestaurantNavbar from './components/RestaurantNavbar';
import HomeContent from './components/HomeContent';
import ReservationForm from './components/ReservationForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <RestaurantNavbar />
      <ReservationForm />
      <HomeContent />
    </>
  );
}

export default App;
