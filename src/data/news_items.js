const notices_and_events = require("./notices_and_envents");

const newsItems = [
    {...notices_and_events.find(item => item.id === "notice-1")},
    // {...notices_and_events.find(item => item.id === "notice-2")},
    // {...notices_and_events.find(item => item.id === "notice-3")},
]

module.exports = newsItems;