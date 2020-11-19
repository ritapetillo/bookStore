import fantasy from "./fantasy.json";
import history from "./history.json";
import horror from "./horror.json";
import scifi from "./scifi.json";
import romance from "./romance.json";
const books = [...scifi, ...fantasy, ...history, ...horror, ...romance]

export default books