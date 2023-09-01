import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./screens/Login";
import Main from "./screens/Main";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import Aos from "aos";
import ContactUs from "./screens/ContactUs";
import AboutUs from "./screens/AboutUs";
import Navbar from "./components/Navbar";
import Team from "./screens/Team";
import Sale from "./components/Sale";
import { Signup } from "./screens/Signup";
import { Toaster } from "react-hot-toast";
import { AdminLogin } from "./screens/AdminLogin";
import {
  ProtectedAdminAuthPages,
  ProtectedAdminPages,
  ProtectedAuthPages,
  ProtectedPages,
} from "./components/ProtectRoutes";
import AdminDashboard from "./screens/AdminDashboard";
import AllUsers from "./screens/AllUsers";
import UsersTransaction from "./screens/UsersTransaction";
import ClaimRequest from "./screens/ClaimRequest";
const queryClient = new QueryClient();

const Root = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Outlet />
    </QueryClientProvider>
  );
};
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Main />} />
      <Route element={<ProtectedAuthPages />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/:id" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
      {/* admin only */}
      <Route element={<ProtectedAdminAuthPages />}>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Route>
      <Route element={<ProtectedAdminPages />}>
        <Route element={<AdminDashboard />}>
          <Route path="/admin/allusers" element={<AllUsers />} />
          <Route
            path="/admin/allusers/transactions"
            element={<UsersTransaction />}
          />
          <Route
            path="/admin/allusers/claimrequest"
            element={<ClaimRequest />}
          />
        </Route>
      </Route>
      {/* admin only edns here  */}
      <Route element={<ProtectedPages />}>
        <Route path="/sale" element={<Sale />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Route>
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
