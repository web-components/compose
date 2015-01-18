var Clock;
Clock = new Component('./greet.js');
Clock.extend('../../template.js');
Clock.install(function (done) {
  this.fetch('./greet.html', done);
});