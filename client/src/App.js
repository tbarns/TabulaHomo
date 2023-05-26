import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Events from './pages/SingleEvent';
import EventDetails from './components/EventDetails';
import "./App.css";
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Connect from "./pages/Connect";
import Artists from "./pages/Artists";
import ArtistDetails from './components/ArtistDetails';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.FADE,
};

function App() {
  return (
    <ApolloProvider client={client}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:eventId" element={<EventDetails />} />
              <Route path="/login" element={<LoginPage />} /> 
              <Route path="/shop" element={<Shop />}/>
              <Route path="/connect" element={<Connect />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/artists" element={<Artists />}/>
              <Route path="/artist/:artistId" element={<ArtistDetails />} />

            </Routes>
          </div>
        </Router>
      </AlertProvider>
    </ApolloProvider>
  );
}

export default App;
