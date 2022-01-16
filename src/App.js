import React, { Component } from "react";
import Layout from "./hoc/layout/Layout";
import { Routes, Route } from "react-router-dom";
import Opros from "./containers/opros/Opros";
import OprosCreator from "./containers/OprosCreator/OprosCreator";
import OprosList from "./containers/OprosList/OprosList";
import Auth from "./containers/Auth/Auth";

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/opros-creator" element={<OprosCreator />} />
          <Route path="/opros/:id" element={<Opros />} />
          <Route path="/" element={<OprosList />} />
        </Routes>
      </Layout>
    );
  }
}

export default App;
