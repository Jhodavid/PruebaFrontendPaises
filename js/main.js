// DECLARACIÓN DE VARIABLES INICIALES

const API_URL = "https://restcountries.com/v2/all";

const listaAfrica = document.querySelector(".listaAfrica");
const listaAmerica = document.querySelector(".listaAmerica");
const listaAsia = document.querySelector(".listaAsia");
const listaEuropa = document.querySelector(".listaEuropa");
const listaOceania = document.querySelector(".listaOceania");
const listaPolar = document.querySelector(".listaPolar");
const listaAntarctic = document.querySelector(".listaAntarctic");
const listaAntarcticOc = document.querySelector(".listaAntarcticOc");
const modalDetalles = document.querySelector(".modal-content");

let totalPaises = [];
let i = 0;

// OBTENIENDO DATOS NECESARIOS DE LOS PAÍSES

fetch(`${API_URL}`)
  .then((response) => response.json())
  .then((paises) => {
    paises.forEach((pais) => {
      let infoPais = {
        nombre: pais.name,
        codigo: pais.alpha3Code,
        region: pais.region,
        poblacion: pais.population,
        capital: pais.capital,
        moneda: pais.currencies,
        idioma: pais.languages,
        paisesFronterizos: pais.borders,
        bandera: pais.flag,
        ubicacion: pais.latlng,
      };
      totalPaises = [...totalPaises, infoPais];
    });

    // CREACIÓN Y LLENADO DE CARDS DE PAÍSES

    totalPaises.forEach((infoP) => {
      // CREACIÓN

      const { bandera, nombre } = infoP;

      const aDivPais = document.createElement("a");
      aDivPais.classList.add("adivPais");
      aDivPais.href = "#";
      aDivPais.addEventListener("click", (e) => {
        
        // LIMPIAMOS MODAL

        limpiarModal();

        // LLENADO DE MODAL DE DETALLE

        const modal = document.querySelector("#idModal");
        const cerrar = document.getElementsByClassName("cerrar")[0];
        const body = document.getElementsByTagName("body")[0];

        modal.style.display = "block";
        body.classList.add("bodyModal");

        cerrar.onclick = function () {
          modal.style.display = "none";
          body.style.position = "inherit";
          body.style.height = "auto";
          body.style.overflow = "visible";
        };

        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
          }
        };

        const {
          nombre,
          codigo,
          region,
          poblacion,
          capital,
          moneda,
          idioma,
          paisesFronterizos,
          bandera,
          ubicacion,
        } = infoP;

        // CREANDO Y LLENANDO ELEMENTOS HTML DEL MODAL DE DETALLES

        const divContenedorDetalleD = document.createElement("div");
        divContenedorDetalleD.classList.add("divContenedorDetalle");

        const divDetallesD = document.createElement("div");
        divDetallesD.classList.add("divDetalles");

        const divDetalleBanderaD = document.createElement("div");
        divDetalleBanderaD.classList.add("divBanderaD");

        const h3NombrePaisD = document.createElement("h2");
        h3NombrePaisD.classList.add("divContenedorDetalle");
        h3NombrePaisD.textContent = nombre;

        const pRegionD = document.createElement("p");
        pRegionD.classList.add("pDetalle");
        pRegionD.textContent = `Región: ${region}`;

        const pPoblacionD = document.createElement("p");
        pPoblacionD.classList.add("pDetalle");
        pPoblacionD.textContent = `Población: ${poblacion}`;

        const pCapitalD = document.createElement("p");
        pCapitalD.classList.add("pDetalle");
        pCapitalD.textContent = `Capital: ${capital}`;

        const pMonedaD = document.createElement("p");
        pMonedaD.classList.add("pDetalle");
        pMonedaD.textContent = `Moneda: ${moneda[0].name} - ${moneda[0].symbol}`;

        const pIdiomaD = document.createElement("p");
        pIdiomaD.classList.add("pDetalle");
        pIdiomaD.textContent = `Idioma: ${idioma[0].name}`;

        const pPaisesFronterizosD = document.createElement("p");
        pPaisesFronterizosD.classList.add("pDetalle");
        pPaisesFronterizosD.textContent = `Paises fronterizos: ${paisesFronterizos}`;

        const imgBanderaD = document.createElement("img");
        imgBanderaD.classList.add("imgBandera");
        imgBanderaD.src = bandera;

        const pUbicacionD = document.createElement("a");
        pUbicacionD.classList.add("pDetalle");
        pUbicacionD.textContent = "Ubicacion";
        if (ubicacion !== undefined) {
          pUbicacionD.href = `https://www.google.es/maps?q=${ubicacion[0]},${ubicacion[1]}`;
        }else{
          pUbicacionD.href = "#";
        }

        // pUbicacionD.href = divDetallesD.appendChild(h3NombrePaisD); Este era el error en la Ubicación
        divDetallesD.appendChild(h3NombrePaisD)                        /////////////////////////////////
        divDetallesD.appendChild(pRegionD);
        divDetallesD.appendChild(pPoblacionD);
        divDetallesD.appendChild(pCapitalD);
        divDetallesD.appendChild(pMonedaD);
        divDetallesD.appendChild(pIdiomaD);
        divDetallesD.appendChild(pPaisesFronterizosD);
        divDetallesD.appendChild(pUbicacionD);
        divContenedorDetalleD.appendChild(divDetallesD);
        divDetalleBanderaD.appendChild(imgBanderaD);
        divContenedorDetalleD.appendChild(divDetalleBanderaD);
        modalDetalles.appendChild(divContenedorDetalleD);
      });

      // CREADO Y LLENADO DE CARDS

      const divPais = document.createElement("div");
      divPais.classList.add("divPais");

      const divImgBandera = document.createElement("div");
      divImgBandera.classList.add("divImgBandera");

      const imgBandera = document.createElement("img");
      imgBandera.classList.add("imgBandera");
      imgBandera.src = bandera;

      const pNombre = document.createElement("p");
      pNombre.classList.add("pNombre");
      pNombre.id = "id" + i;
      pNombre.textContent = nombre;

      const imgFavorito = document.createElement("img");
      imgFavorito.classList.add("imgFavorito");
      imgFavorito.src = "img/iconFavorito.png";
      imgFavorito.addEventListener("click", () => {
        if (imgFavorito.classList.contains("imgFavoritoSelect")) {
          imgFavorito.classList.remove("imgFavoritoSelect");
        } else {
          imgFavorito.classList.add("imgFavoritoSelect");
        }
      });

      i++;
      // ASIGNACIÓN DE HIJOS

      divImgBandera.appendChild(imgBandera);
      divPais.appendChild(divImgBandera);
      divPais.appendChild(pNombre);
      divPais.appendChild(imgFavorito);
      aDivPais.appendChild(divPais);

      // LLENADO

      if (infoP.region === "Africa") {
        listaAfrica.appendChild(aDivPais);
      } else if (infoP.region === "Americas") {
        listaAmerica.appendChild(aDivPais);
      } else if (infoP.region === "Americas") {
        listaAmerica.appendChild(aDivPais);
      } else if (infoP.region === "Asia") {
        listaAsia.appendChild(aDivPais);
      } else if (infoP.region === "Europe") {
        listaEuropa.appendChild(aDivPais);
      } else if (infoP.region === "Oceania") {
        listaOceania.appendChild(aDivPais);
      } else if (infoP.region === "Polar") {
        listaPolar.appendChild(aDivPais);
      } else if (infoP.region === "Antarctic") {
        listaAntarctic.appendChild(aDivPais);
      } else if (infoP.region === "Antarctic Ocean") {
        listaAntarcticOc.appendChild(aDivPais);
      }
    });

    // METODO BUSCAR

    const pNombrePais = document.querySelectorAll(".pNombre");
    const inputBuscar = document.querySelector(".buscador");
    const btnBuscar = document.querySelector("#Buscar");
    let buscado;

    btnBuscar.addEventListener("click", () => {
      pNombrePais.forEach((pais) => {
        buscado = document.querySelector(`#${pais.id}`);
        if (pais.textContent === inputBuscar.value) {
          btnBuscar.href = `#${pais.id}`;
          buscado.parentNode.classList.add("buscadoSelect");
        }
      });
    });
  });

// FUNCIONES EXTERNAS

function limpiarModal() {
  while (modalDetalles.childNodes[2]) {
    modalDetalles.removeChild(modalDetalles.childNodes[2]);
  }
}
