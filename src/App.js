import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context.js/AuthContext";
import Router from "./router/Router";
import ThemeProvider from "./theme";
import "./App.css";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
