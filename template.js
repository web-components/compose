/*globals Component:false*/
(function (Component) {
  'use strict';

  var Template;
  Template = new Component('../../template.js');
  Template.install(function (done) {
    var xhr, eid, src, handler;
    xhr = new XMLHttpRequest();
    eid = this.element.getAttribute('id');
    src = this.element.getAttribute('src');

    this.getIds = function (text) {
      return (text.match(/<component\b([^>]*)>/g) || []).map(function (element) {
        return element.match(/id="([^'"]*)"/)[1];
      }.bind(this));
    }.bind(this);

    this.parseIds = function (text) {
      (text.match(/<interface\b([^>]*)>/g) || []).forEach(function (exported) {
        var attr, id, element;
        attr = exported.match(/(\w*)=/g)[0].replace('=', '');
        id = exported.match(/(\w*)=['"](\w*)['"]/g)[0].replace(attr + '=', '').replace(/['"]/g, '');

        element = document.querySelector('[' + attr + '=' + eid + ']');
        if (element) element.setAttribute(attr, eid + '_' + id);
      });

      text = text.replace(/<interface\b([^>]*)>/g, '');

      this.getIds(text).forEach(function (id) {
        text = text.replace(new RegExp('[\'\"]' + id + '[\'\"]', 'g'), '"' + eid + '_' + id + '"');
      }.bind(this));

      return text;
    }.bind(this);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      this.element.innerHTML = this.parseIds(xhr.responseText);
      handler();
    }.bind(this);

    this.fetch = function (src, done) {
      xhr.open('GET', src, true);
      handler = done;
      xhr.send();
    }.bind(this);

    if (!src) return done();
    return this.fetch(src, done);
  });
}(Component));