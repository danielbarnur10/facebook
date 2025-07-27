import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { UserForm } from "./pages/LoginForm";
import { RegisterForm } from "./pages/RegisterForm";
import { Navbar } from "./components/Navbar";
import type { ReactNode } from "react";
import { PostsPage } from "./pages/Posts";
import { getToken } from "./cookie/cookie";
import { PostProvider } from "./providers/PostProvider";


function PrivateRoute({ children }: { children: ReactNode }) {
  // const { user } = useAuth();
  const token = getToken();

  return token ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/posts"
              element={
                <PrivateRoute>
                  <PostsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;