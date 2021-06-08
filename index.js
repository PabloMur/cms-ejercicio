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
      const fieldsCollection = data.items.map((item) => {
        const indice = data.items.indexOf(item);
        const imgURL = data.includes.Asset[indice].fields.file.url;
        const test = "http:" + imgURL;

        return {
          title: item.fields.titulo,
          description: item.fields.descripcion,
          url: item.fields.url,
          img: test,
        };
      });
      console.log(data);

      let a = data.items[0].fields.imagen.sys.id;
      let b = data.includes.Asset[1].sys.id;

      if (a == b) {
        console.log(true);
      }

      return fieldsCollection;
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
