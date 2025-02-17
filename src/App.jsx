import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./auth/SignIn";
import Nav from "./components/Nav";
import DashBoard from "./pages/DashBoard";
import EventManagement from "./pages/EventManagement";
import MovieManagement from "./pages/MovieManagement";
import TheatreManagement from "./pages/TheatreManagement";
import Global from "./components/globalController/Global";
import Tickets from "./pages/Tickets";
import GeneralSettings from "./pages/GeneralSettings";
import Report from "./pages/Report";
import ScreenManagement from "./pages/ScreenManagement";
import ClassManagement from "./pages/ClassManagement";
import SeatBlockingManagement from "./pages/SeatBlockingManagement";
import VerifyOtp from "./auth/VerifyOtp";
import ResendOtp from "./auth/ResendOtp";
import ForgotPassword from "./auth/ForgotPassword";
import RecoverPassword from "./auth/RecoverPassword";
import Classdetail from "./pages/Classdetail";
import SeatingManagement from "./pages/SeatingManagement";
import Seatdetail from "./pages/Seatdetail";
import RowManagement from "./pages/RowManagement";
import Rowdetail from "./pages/RowDetails";
import MovieDetailPage from "./pages/MovieDetailPage";
import MovieDateTime from "./pages/MovieDateTime";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/otp" element={<VerifyOtp />} />
      <Route path="/resend-otp" element={<ResendOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<RecoverPassword />} />

      <Route element={<Nav />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/event-management" element={<EventManagement />} />
        <Route path="/class" element={<ClassManagement />} />
        <Route path="/class-detail/:id" element={<Classdetail />} />
        <Route path="/seat-management" element={<SeatingManagement />} />
        <Route path="/seat-detail/:id" element={<Seatdetail />} />
        <Route path="/row-management" element={<RowManagement />} />
        <Route path="/row-detail/:id" element={<Rowdetail />} />
        <Route path="/movie-detail/:id" element={<MovieDetailPage />} />
        <Route path="/movie-date-time/:id" element={<MovieDateTime />} />
        <Route path="/movie-management" element={<MovieManagement />} />
        <Route path="/seat-blocking" element={<SeatBlockingManagement />} />
        <Route path="/theatre-management" element={<TheatreManagement />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/report" element={<Report />} />
        <Route path="/screen-ctrl" element={<ScreenManagement />} />
        <Route path="/settings" element={<GeneralSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Route>
  )
);

const App = () => {
  return (
    <Global>
      <RouterProvider router={router} />
    </Global>
  );
};

export default App;
