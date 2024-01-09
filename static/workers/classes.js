class Match {
    constructor(content, groupNumber, name, start, end) {
      this.content = content;
      this.groupNumber = groupNumber;
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

class MatchError {
  constructor(message){
    this.error = message;
  }
}

var debug = false;