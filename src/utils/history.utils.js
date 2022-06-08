import { createBrowserHistory, HashHistory, MemoryHistory } from "history";

class HistoryService {
  constructor() {
    this.history = createBrowserHistory();
    this.history.listen((state) => {
      console.log(state);
    });
  }
  push() {
    this.history.push(path);
  }
}

export const HistoryService = new HistoryService();
