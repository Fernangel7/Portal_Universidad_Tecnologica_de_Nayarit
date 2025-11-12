const educative_offer = require("./educative_offer.js")

const programs_List = [
    "grastronomy_program",
    "logistics_program",
    "admin_program"
]

const featuredPrograms = [
    {...educative_offer.find(program => program.id === programs_List[0])},
    {...educative_offer.find(program => program.id === programs_List[1])},
    {...educative_offer.find(program => program.id === programs_List[2])},
]

delete featuredPrograms[0].id
delete featuredPrograms[0].programDetails
delete featuredPrograms[1].id
delete featuredPrograms[1].programDetails
delete featuredPrograms[2].id
delete featuredPrograms[2].programDetails

module.exports = featuredPrograms