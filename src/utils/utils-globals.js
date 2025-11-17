const website_name = "Universidad Tecnologica de Nayarit"
const loading_delay = 500
const InscriptionProcess = false

function captalize_case (str) {
    return str.split(' ').map(palabra => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  }).join(' ');
}


module.exports = {
    captalize_case,
    loading_delay,
    website_name,
    InscriptionProcess
}