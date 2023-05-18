export default class Country {
    constructor(_parent, _item, _createCountryByCode, _getCountrybyCode, _showInitialCountries) {
        this.createCountryByCode = _createCountryByCode;
        this.getCountrybyCode = _getCountrybyCode;
        this.showInitialCountries = _showInitialCountries;

        this.parent = _parent;
        this.name = _item.name.common;
        this.capital = _item.capital;
        this.borders = _item.borders;
        this.population = this.formatNumber(_item.population);
        this.flag = _item.flags.png;
        this.region = _item.subregion ? _item.subregion : "none";
        this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
        this.currencies = _item.currencies ? Object.keys(_item.currencies).join() : "none";
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
        this.code = _item.cca3;
    }
    formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        }
        else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    }
    render() {
        let div = document.createElement("div");
        div.className = "row justify-content-around p-0 overflow-hidden";
        div.innerHTML = `
            <img src=${this.flag} class="float-start col-8 col-md-5">
            <div class="info col-8 col-md-5">
                <h2>${this.name}</h2>
                <p>Population: ${this.population}</p>
                <p>Capital: ${this.capital}</p>
                <p>Region: ${this.region}</p>
                <p>Languages: ${this.languages} </p>
                <p>Coins: ${this.currencies}</p>
                <div id="id_borders"> Borders:</div>
            </div>
        <iframe class="mt-4 mb-5 col-11" height="300" src="https://maps.google.com/maps?q=${this.lat},${this.lon}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>`;
        if (this.borders) {
            this.borders.forEach(async (item) => {
                let name = await this.getCountrybyCode(item);
                let span = document.createElement("span");
                span.className = "lank";
                span.innerHTML = `${name}`;
                document.querySelector("#id_borders").append(span);
                span.addEventListener("click", () => {
                    this.createCountryByCode(item);
                })
            });
        }
        else {
            div.querySelector("#id_borders").innerHTML += " No Borders Found";
        }
        document.querySelector(this.parent).append(div);
    }

    previewRender() {
        let div = document.createElement("div");
        // div.style.color = "white"
        div.className = "card aside mt-5 p-0 ";
        div.innerHTML = `<div id="id_card" class="text-center" style="border: none;">
                <img src=${this.flag} width="100%" height="200px" class="overflow-hidden border-radius-1"  style="border-radius: 3px;">
                <h2 class="m-1">${this.name}</h2>
                <p class="m-1">Population: ${this.population}</p>
                <p class="m-1">Reigion: ${this.region}</p>
                <button class="btn" id="info_btn">More Info</button>
            </div>`;

        let card = div.querySelector("#id_card");
        card.addEventListener("click", () => {
            this.createCountryByCode(this.code);
        })
        document.querySelector(this.parent).append(div);
    }
}