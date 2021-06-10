function addWorkCard(params = {}) {
  const template = document.querySelector("#portfolio--work__template");
  const container = document.querySelector(".portfolio--container__results");

  template.content.querySelector(".portfolio--work__title").textContent =
    params.title;

  template.content.querySelector(".portfolio--work__description").textContent =
    params.description;

  template.content.querySelector(".potfolio--work__img").src = params.img;

  template.content.querySelector(".portfolio--work__link").href = params.url;

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getWorks() {
  return fetch(
    "https://cdn.contentful.com/spaces/5xbk2z82bc5k/environments/master/entries?access_token=JJ3XNobA54WqjpmpAtiyUtnixWDPg0825dOD4WDCMWo&&content_type=portfolio"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //funcion que nos da un array con los items de cms
      const fieldsCollection = data.items.map((item) => {
        const indice = data.items.indexOf(item);
        const imgURL = data.includes.Asset[indice].fields.file.url;
        const test = "http:" + imgURL;

        return {
          title: item.fields.titulo,
          description: item.fields.descripcion,
          url: item.fields.url,
          //img: test,
          urlIMg: item.fields.imagen.sys.id,
        };
      });

      //funcion que nos da un array con las imagenes de los elementos
      const urlImgEl = data.includes.Asset.map((item) => {
        return {
          url: item.fields.file.url,
          position: data.includes.Asset.indexOf(item),
          id: item.sys.id,
        };
      });

      const devuelvePares = () => {
        let items = fieldsCollection;
        let arrayRespuesta = [];

        for (const item of items) {
          let arrayImagenes = urlImgEl;
          for (const imagen of arrayImagenes) {
            if (item.urlIMg == imagen.id) {
              item.img = "http:" + imagen.url;
              arrayRespuesta.push(item);
            }
          }
        }

        return arrayRespuesta;
      };

      return devuelvePares();
    });
}

function main() {
  getWorks().then(function (works) {
    for (const w of works) {
      addWorkCard(w);
    }
  });
}

main();
