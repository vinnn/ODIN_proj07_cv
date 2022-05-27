import React, { Component } from 'react';
import './styles/App.css';
import uniqid from 'uniqid';
import GeneralSection from './components/GeneralSection';
import AcademicSection from './components/AcademicSection';
import ProfessionalSection from './components/ProfessionalSection';


class App extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div>

        <h1 className="cv-title">New Flash CiVi</h1>

        <GeneralSection></GeneralSection>

        <AcademicSection></AcademicSection>

        {/* <ProfessionalSection></ProfessionalSection> */}

      </div>
    )
  }
}

export default App;




