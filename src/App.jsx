import RestaurantNavbar from './components/RestaurantNavbar';
import HomeContent from './components/HomeContent';
import ReservationForm from './components/ReservationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSection from './components/AdminSection';

function App() {
  return (
    <>
      <RestaurantNavbar />
      <AdminSection />
      <ReservationForm />
      <HomeContent />
    </>
  );
}

export default App;
