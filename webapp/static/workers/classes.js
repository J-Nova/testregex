class Match {
    constructor(content, group_number, name, start, end) {
      this.content = content;
      this.group_number = group_number;
      this.name = name;
      this.start = start;
      this.end = end;
    }
}

class Result{
  constructor(result, time, steps, catastrophic){
    this.result = result;
    this.time = time;
    this.steps = steps;
    this.catastrophic = catastrophic;
  }
}

class Error {
  constructor(message){
    this.error = message;
  }
}

var debug = true;