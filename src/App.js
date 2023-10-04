import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Quiz from "./pages/Quiz";
import AuthProvider from "./context/AuthProvider";
import Questions from "./pages/Questions";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/questions/:id" element={<Questions />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
