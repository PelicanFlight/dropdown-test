
import { useEffect, useState } from 'react';
import './App.css';
import Dropdown from './components/dropdown/dropdown';

import CountryText from "./data/countries.txt"
import LanguageText from "./data/language.txt"


function App() {

const [countries, setCountries] = useState([])
const [language, setLanguage] = useState([])


const [countryValue, setCountryValue] = useState(null)
const [languageValue, setLanguageValue] = useState(null)


const fetchData = () => {
fetch(CountryText)
  .then(r => r.json())
  .then(CountriesData => {
    setCountries(CountriesData);
  });
  
fetch(LanguageText)
  .then(r => r.json())
  .then(languageData => {
    setLanguage(languageData);
  });
}

useEffect(() => {
  fetchData()
}, [])

  return (
    <div className="App" >

<Dropdown options={countries} 
prompt='Select Country...'
value={countryValue}
label='name'
onChange={val => setCountryValue(val)}
/>

<Dropdown options={language} 
prompt='Select Language...'
value={languageValue}
label='name'
onChange={val => setLanguageValue(val)}
/>

    </div>
  );
}

export default App;
