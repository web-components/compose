var Counter;
Counter = new Component('./counter.js');
Counter.listen('tickEvent', function () {
  this.add();
});
Counter.install(function (done) {
  var counted = 0;

  this.add = function () {
    this.element.innerHTML = (++counted) + ' ciclos';
  };

  done();
});