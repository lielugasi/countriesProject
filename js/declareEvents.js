import { createCountries, createCountryByCode, showInitialCountries } from "./countriesManagement.js";

export const declareEvents = () => {
    let row = document.querySelector("#id_row");
    let form = document.querySelector("#id_form");
    let input = document.querySelector("#id_input");
    let allCountries = document.querySelector("#all_id");
    let israel = document.querySelector("#israel_id");
    let usa = document.querySelector("#usa_id");
    let uk = document.querySelector("#uk_id");
    let thailand = document.querySelector("#thailand_id");
    let france = document.querySelector("#france_id");
    let select=document.querySelector("#id_select");
    let home=document.querySelector("#home_id");
   
    

    let burger_btn = document.querySelector("#burger_btn");
    let nav_open = document.querySelector("#nav_open");
    burger_btn.addEventListener("click",()=>{
      (nav_open.style.display != "block") ?  nav_open.style.display = "block" :  nav_open.style.display = "none";
    })

    home.addEventListener("click",()=>{
        row.innerHTML = "";
        showInitialCountries();
    })
    israel.addEventListener("click", () => {
        row.innerHTML = "";
        createCountryByCode("isr");
    })
    usa.addEventListener("click", () => {
        row.innerHTML = "";
        createCountryByCode("USA");
    })
    uk.addEventListener("click", () => {
        row.innerHTML = "";
        createCountryByCode("gbr");
    })
    thailand.addEventListener("click", () => {
        row.innerHTML = "";
        createCountryByCode("tha");
    })
    france.addEventListener("click", () => {
        row.innerHTML = "";
        createCountryByCode("fra");
    })
    allCountries.addEventListener("click", () => {
        row.innerHTML = "";
        createCountries("");
        
    })
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        createCountries(input.value);
    })

    select.addEventListener("change", ()=>{
        createCountries(input.value, select.value);
    })

}