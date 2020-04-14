var colorWell;
var defaultColor = "#0000ff";

window.addEventListener("load", startup, false);


function startup() {
  colorWell = document.querySelector("#colorWell");
  colorWell.value = defaultColor;
  colorWell.addEventListener("input", updateFirst, false);
  colorWell.addEventListener("change", updateAll, false);
  colorWell.select();
}

function updateFirst(event) {
  // console.log("====", document.getElementsByTagName('canvas'))
  console.log("The Canvas are", event)
  canvas.getActiveObject().set({ fill: event.target.value });
  canvas.renderAll();
}

function updateAll(event) {
}