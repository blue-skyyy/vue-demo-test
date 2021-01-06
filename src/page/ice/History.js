export function ICEHistory() {
  this.historyList = [];
}

ICEHistory.prototype.getLast = function() {
  if (this.historyList.length > 0) {
    return this.historyList[this.historyList.length - 1];
  }
  return null;
};

ICEHistory.prototype.push = function(history) {
  this.historyList.push(history);
};

ICEHistory.prototype.delLast = function() {
  if (this.historyList.length > 0) {
    this.historyList = this.historyList.slice(0, this.historyList.length - 1);
  }
};

ICEHistory.prototype.getLength = function() {
  return this.historyList.length;
};

ICEHistory.prototype.empty = function() {
  this.historyList = [];
};
