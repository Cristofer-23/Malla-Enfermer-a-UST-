const ramos = {
  "1-1": [
    { nombre: "Química" },
    { nombre: "Biología Celular" },
    { nombre: "Bases disciplinares" }
  ],
  "1-2": [
    { nombre: "Bioquímica", prereqs: ["Química", "Biología Celular"] },
    { nombre: "APS", prereqs: ["Bases disciplinares"] }
  ]
};
const aprobados = new Set();
function crearRamo(ramo) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo.nombre;
  div.dataset.nombre = ramo.nombre;
  div.dataset.prereqs = JSON.stringify(ramo.prereqs || []);
  const puedeDesbloquearse = (ramo.prereqs || []).every(pr => aprobados.has(pr));
  if ((ramo.prereqs || []).length === 0 || puedeDesbloquearse) {
    div.classList.add("desbloqueado");
  }
  div.addEventListener("click", () => {
    if (!div.classList.contains("desbloqueado") || div.classList.contains("aprobado")) return;
    div.classList.add("aprobado");
    aprobados.add(ramo.nombre);
    actualizarDesbloqueos();
  });
  return div;
}
function actualizarDesbloqueos() {
  document.querySelectorAll(".ramo").forEach(div => {
    const prereqs = JSON.parse(div.dataset.prereqs || "[]");
    if (prereqs.every(pr => aprobados.has(pr))) {
      div.classList.add("desbloqueado");
    }
  });
}
function construirMalla() {
  const container = document.getElementById("malla-container");
  Object.entries(ramos).forEach(([semestre, lista]) => {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    divSem.innerHTML = `<h2>Semestre ${semestre}</h2>`;
    lista.forEach(ramo => {
      const divRamo = crearRamo(ramo);
      divSem.appendChild(divRamo);
    });
    container.appendChild(divSem);
  });
}
construirMalla();