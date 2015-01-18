var Counter;
Counter = new Component('./counter.js');
Counter.listen('tickEvent', function () {
  this.add();
});
Counter.provide('counterInterface', function (done) {
  done({'get' : this.get.bind(this)});
});
Counter.install(function (done) {
  var counted = 0;

  this.add = function () {
    this.element.innerHTML = (++counted) + ' ciclos';
  };

  this.get = function () {
    return counted;
  };

  done();
});