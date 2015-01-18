var Timer;
Timer = new Component('./timer.js');
Timer.publish('tickEvent');
Timer.install(function (done) {
  this.tick = function () {
    this.element.innerHTML = this.element.innerHTML === 'tick' ? 'tack' : 'tick';
    this.tickEvent();
  };
  done();
});
Timer.start(function (done) {
  setInterval(this.tick.bind(this), 1000);
  done();
});