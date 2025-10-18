const website_name = "Universidad Tecnologica de Nayarit";

function captalize_case (str) {
    return str.split(' ').map(palabra => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  }).join(' ');
}

module.exports = {
    captalize_case,
    website_name
}