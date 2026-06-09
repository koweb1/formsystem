import Profile from "./pages/profile";
import { Routes, Route } from "react-router-dom";
import Loggin from "./component/login";
import Forms from "./component/form";
import AccountCreated from "./component/formsuccess";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Forms />} />
      <Route path="/Loggin" element={<Loggin />} />
      <Route path="/account-created" element={<AccountCreated />} />
      <Route path="/user-profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
