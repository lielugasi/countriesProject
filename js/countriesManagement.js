import { showLoading, hideLoading } from "./appCountries.js";
import Country from "./country.js";
let allCountries_arr = [];
let initialCountries_arr = [
    "israel", "united states", "thailand", "france", "united kingdom"
]

//create the preview of all the countries that appear in the search
export const createCountries = (_input, _sort = "name.common") => {
   showLoading();
    document.querySelector("#id_row").innerHTML = "";
    let _arr = allCountries_arr.filter(item => item.name.common.toLowerCase().includes(_input.toLowerCase()));
    _arr = _.sortBy(_arr, _sort);
    if(_sort=="population"){
        _arr=_.reverse(_arr);
    }
    hideLoading();
    if (_arr.length > 0) {
        _arr.forEach(item => {
            let country = new Country("#id_row", item, createCountryByCode, getCountrybyCode, showInitialCountries);
            country.previewRender();
        });
    }
    else{
        document.querySelector("#id_row").innerHTML=`<h1 class="text-white text-center">The country ${_input} is not found</h1>`
    }
}

export const countries = (_data) => {
    hideLoading();
    allCountries_arr = _data;
    // sortOptions();
}

//return the full name of the country by getting it's code
export const getCountrybyCode = async (_code) => {
    let url = `https://restcountries.com/v3.1/alpha/${_code}`;
    let response = await fetch(url);
    let data = await response.json();
    return data[0].name.common;
}
//create the preview of the first five countries
export const showInitialCountries = () => {
   showLoading();
    let fiveCountries_arr = [];
    fiveCountries_arr = allCountries_arr.filter(item =>
        initialCountries_arr.includes(item.name.common.toLowerCase()));
    hideLoading();
    fiveCountries_arr.forEach(item => {
        let country = new Country("#id_row", item, createCountryByCode, getCountrybyCode, showInitialCountries);
        country.previewRender();
    });
}

//create the view of specific country by getting its code
export const createCountryByCode = (_input) => {
    showLoading();
    document.querySelector("#id_row").innerHTML = "";
    let _arr = allCountries_arr.filter(item => item.cca3.toLowerCase().includes(_input.toLowerCase()));
    hideLoading();
    if (_arr.length > 0) {
        _arr.forEach(item => {
            let country = new Country("#id_row", item, createCountryByCode, getCountrybyCode, showInitialCountries);
            country.render();
        });
    }
    else {
        document.querySelector("#id_row").innerHTML = `<h2 class="text-white">The country ${_input} is not found</h2>`;
    }
}

