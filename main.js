const $nombre = document.querySelector("input")
const $agregar = document.querySelector("#agregar")
const $borrar = document.querySelector("#borrar")
const $listaDeVecinos = document.querySelector("ul")
const $parrafo = document.querySelector("p")

//Trayendo el array del localStorage
const vecinos = JSON.parse(localStorage.getItem("vecinos")) || []

const listarVecinos = () => {
  if (vecinos.length === 0) {
    mostrarTexto("success", "failure", "No hay vecinos para listar");
    $listaDeVecinos.innerHTML = ""
  } else {
    $listaDeVecinos.innerHTML = ""
    vecinos.forEach((vecino) => {
      $listaDeVecinos.innerHTML += `<li>${vecino}</li>`
    });
    $nombre.value = "";
  }
}

const agregarVecino = () => {
  const valorNombre = $nombre.value

  //Validaciones
  if (!valorNombre) {
    mostrarTexto("failure", "success", "Ingresa un nombre valido");
    return
  };

  if (valorNombre.length < 3) {
    mostrarTexto("failure", "success", "El nombre debe tener al menos tres caracteres");
    return
  };

  if (!isNaN(valorNombre)) {
    mostrarTexto("failure", "success", "Ingrese solo texto, por favor");
    return
  }

  //Funcion de agregado de elemento
  vecinos.push(valorNombre);

  localStorage.setItem("vecinos", JSON.stringify(vecinos))

  $nombre.value = ""

  //Funcion de la notificacion
  mostrarTexto("success", "failure", "Vecino añadido con exito");
  listarVecinos();
}

const borrarVecino = () => {
  const valorNombre = $nombre.value;
  const vecinoEncontrardo = vecinos.find((vecino) => vecino === valorNombre);
  const indice = vecinos.indexOf(vecinoEncontrardo);

  if (!valorNombre) {
    mostrarTexto("failure", "success", "Ingresa un nombre valido")
    return
  }

  if (!vecinoEncontrardo) {
    mostrarTexto("failure", "success", "No se encontro al vecino")
    return
  }

  if (!isNaN(valorNombre)) {
    mostrarTexto("failure", "success", "Ingrese solo texto, por favor");
    return
  } else {
    vecinos.splice(indice, 1);

    localStorage.setItem("vecinos", JSON.stringify(vecinos))

    $nombre.value = ""

    mostrarTexto("success", "failure", "Vecino quitado con exito");
  }

  $nombre.value = ""
  listarVecinos();
}

const mostrarTexto = (claseAgregada, claseQuitada, texto) => {
  if (vecinos.length === 0 && $nombre.value === "") {
    /*     const claseSobrante = $parrafo.classList.item(0);
        $parrafo.classList.remove(claseSobrante); */
    $parrafo.removeAttribute("class")
    $parrafo.textContent = texto;
  } else if (vecinos.length >= 0) {
    $parrafo.classList.add(claseAgregada);
    $parrafo.classList.remove(claseQuitada);
    $parrafo.textContent = texto;
  }
}
//Invocando la interaccion de la lista
$agregar.addEventListener("click", agregarVecino);
$borrar.addEventListener("click", borrarVecino);

//Listar elementos de la lista
listarVecinos();