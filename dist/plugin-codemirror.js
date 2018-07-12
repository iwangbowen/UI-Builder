require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({29:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_builder2.default.CodeEditor = {

	isActive: false,
	oldValue: '',
	doc: false,
	codemirror: false,

	init: function init(doc) {

		if (this.codemirror == false) {
			this.codemirror = CodeMirror.fromTextArea(document.querySelector("#vvveb-code-editor textarea"), {
				mode: 'text/html',
				lineNumbers: true,
				autofocus: true,
				lineWrapping: true,
				//viewportMargin:Infinity,
				theme: 'material'
			});

			this.isActive = true;
			this.codemirror.getDoc().on("change", function (e, v) {
				if (v.origin != "setValue") delay(_builder2.default.Builder.setHtml(e.getValue()), 1000);
			});
		}

		//_self = this;
		_builder2.default.Builder.frameBody.on("vvveb.undo.add vvveb.undo.restore", function (e) {
			_builder2.default.CodeEditor.setValue(e);
		});
		//load code when a new url is loaded
		_builder2.default.Builder.documentFrame.on("load", function (e) {
			_builder2.default.CodeEditor.setValue();
		});

		this.isActive = true;
		this.setValue();

		return this.codemirror;
	},

	setValue: function setValue(value) {
		if (this.isActive == true) {
			var scrollInfo = this.codemirror.getScrollInfo();
			this.codemirror.setValue(_builder2.default.Builder.getBeautifiedHtml());
			this.codemirror.scrollTo(scrollInfo.left, scrollInfo.top);
		}
	},

	destroy: function destroy(element) {
		/*
  //save memory by destroying but lose scroll on editor toggle
  this.codemirror.toTextArea();
  this.codemirror = false;
  */
		this.isActive = false;
	},

	toggle: function toggle() {
		if (this.isActive != true) {
			this.isActive = true;
			return this.init();
		}
		this.isActive = false;
		this.destroy();
	}
};

},{"./builder":1}]},{},[29])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHBsdWdpbi1jb2RlbWlycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7OztBQUVBLGtCQUFNLFVBQU4sR0FBbUI7O0FBRWxCLFdBQVUsS0FGUTtBQUdsQixXQUFVLEVBSFE7QUFJbEIsTUFBSSxLQUpjO0FBS2xCLGFBQVcsS0FMTzs7QUFPbEIsT0FBTSxjQUFTLEdBQVQsRUFBYzs7QUFFbkIsTUFBSSxLQUFLLFVBQUwsSUFBbUIsS0FBdkIsRUFDQTtBQUNDLFFBQUssVUFBTCxHQUFrQixXQUFXLFlBQVgsQ0FBd0IsU0FBUyxhQUFULENBQXVCLDZCQUF2QixDQUF4QixFQUErRTtBQUNoRyxVQUFNLFdBRDBGO0FBRWhHLGlCQUFhLElBRm1GO0FBR2hHLGVBQVcsSUFIcUY7QUFJaEcsa0JBQWMsSUFKa0Y7QUFLaEc7QUFDQSxXQUFPO0FBTnlGLElBQS9FLENBQWxCOztBQVNBLFFBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNBLFFBQUssVUFBTCxDQUFnQixNQUFoQixHQUF5QixFQUF6QixDQUE0QixRQUE1QixFQUFzQyxVQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQ3JELFFBQUksRUFBRSxNQUFGLElBQVksVUFBaEIsRUFDQSxNQUFNLGtCQUFNLE9BQU4sQ0FBYyxPQUFkLENBQXNCLEVBQUUsUUFBRixFQUF0QixDQUFOLEVBQTJDLElBQTNDO0FBQ0EsSUFIRDtBQUlBOztBQUdEO0FBQ0Esb0JBQU0sT0FBTixDQUFjLFNBQWQsQ0FBd0IsRUFBeEIsQ0FBMkIsbUNBQTNCLEVBQWdFLFVBQVUsQ0FBVixFQUFhO0FBQUUscUJBQU0sVUFBTixDQUFpQixRQUFqQixDQUEwQixDQUExQjtBQUE4QixHQUE3RztBQUNBO0FBQ0Esb0JBQU0sT0FBTixDQUFjLGFBQWQsQ0FBNEIsRUFBNUIsQ0FBK0IsTUFBL0IsRUFBdUMsVUFBVSxDQUFWLEVBQWE7QUFBRSxxQkFBTSxVQUFOLENBQWlCLFFBQWpCO0FBQTZCLEdBQW5GOztBQUVBLE9BQUssUUFBTCxHQUFnQixJQUFoQjtBQUNBLE9BQUssUUFBTDs7QUFFQSxTQUFPLEtBQUssVUFBWjtBQUNBLEVBckNpQjs7QUF1Q2xCLFdBQVUsa0JBQVMsS0FBVCxFQUFnQjtBQUN6QixNQUFJLEtBQUssUUFBTCxJQUFpQixJQUFyQixFQUNBO0FBQ0MsT0FBSSxhQUFhLEtBQUssVUFBTCxDQUFnQixhQUFoQixFQUFqQjtBQUNBLFFBQUssVUFBTCxDQUFnQixRQUFoQixDQUF5QixrQkFBTSxPQUFOLENBQWMsaUJBQWQsRUFBekI7QUFDQSxRQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBeUIsV0FBVyxJQUFwQyxFQUEwQyxXQUFXLEdBQXJEO0FBQ0E7QUFDRCxFQTlDaUI7O0FBZ0RsQixVQUFTLGlCQUFTLE9BQVQsRUFBa0I7QUFDMUI7Ozs7O0FBS0EsT0FBSyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsRUF2RGlCOztBQXlEbEIsU0FBUSxrQkFBVztBQUNsQixNQUFJLEtBQUssUUFBTCxJQUFpQixJQUFyQixFQUNBO0FBQ0MsUUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsVUFBTyxLQUFLLElBQUwsRUFBUDtBQUNBO0FBQ0QsT0FBSyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsT0FBSyxPQUFMO0FBQ0E7QUFqRWlCLENBQW5CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBWdnZlYiBmcm9tICcuL2J1aWxkZXInO1xyXG5cclxuVnZ2ZWIuQ29kZUVkaXRvciA9IHtcclxuXHRcclxuXHRpc0FjdGl2ZTogZmFsc2UsXHJcblx0b2xkVmFsdWU6ICcnLFxyXG5cdGRvYzpmYWxzZSxcclxuXHRjb2RlbWlycm9yOmZhbHNlLFxyXG5cdFxyXG5cdGluaXQ6IGZ1bmN0aW9uKGRvYykge1xyXG5cclxuXHRcdGlmICh0aGlzLmNvZGVtaXJyb3IgPT0gZmFsc2UpXHRcdFxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNvZGVtaXJyb3IgPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Z2dmViLWNvZGUtZWRpdG9yIHRleHRhcmVhXCIpLCB7XHJcblx0XHRcdFx0bW9kZTogJ3RleHQvaHRtbCcsXHJcblx0XHRcdFx0bGluZU51bWJlcnM6IHRydWUsXHJcblx0XHRcdFx0YXV0b2ZvY3VzOiB0cnVlLFxyXG5cdFx0XHRcdGxpbmVXcmFwcGluZzogdHJ1ZSxcclxuXHRcdFx0XHQvL3ZpZXdwb3J0TWFyZ2luOkluZmluaXR5LFxyXG5cdFx0XHRcdHRoZW1lOiAnbWF0ZXJpYWwnXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5pc0FjdGl2ZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuY29kZW1pcnJvci5nZXREb2MoKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZSwgdikgeyBcclxuXHRcdFx0XHRpZiAodi5vcmlnaW4gIT0gXCJzZXRWYWx1ZVwiKVxyXG5cdFx0XHRcdGRlbGF5KFZ2dmViLkJ1aWxkZXIuc2V0SHRtbChlLmdldFZhbHVlKCkpLCAxMDAwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly9fc2VsZiA9IHRoaXM7XHJcblx0XHRWdnZlYi5CdWlsZGVyLmZyYW1lQm9keS5vbihcInZ2dmViLnVuZG8uYWRkIHZ2dmViLnVuZG8ucmVzdG9yZVwiLCBmdW5jdGlvbiAoZSkgeyBWdnZlYi5Db2RlRWRpdG9yLnNldFZhbHVlKGUpO30pO1xyXG5cdFx0Ly9sb2FkIGNvZGUgd2hlbiBhIG5ldyB1cmwgaXMgbG9hZGVkXHJcblx0XHRWdnZlYi5CdWlsZGVyLmRvY3VtZW50RnJhbWUub24oXCJsb2FkXCIsIGZ1bmN0aW9uIChlKSB7IFZ2dmViLkNvZGVFZGl0b3Iuc2V0VmFsdWUoKTt9KTtcclxuXHJcblx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdHRoaXMuc2V0VmFsdWUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5jb2RlbWlycm9yO1xyXG5cdH0sXHJcblxyXG5cdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0aWYgKHRoaXMuaXNBY3RpdmUgPT0gdHJ1ZSlcclxuXHRcdHtcclxuXHRcdFx0dmFyIHNjcm9sbEluZm8gPSB0aGlzLmNvZGVtaXJyb3IuZ2V0U2Nyb2xsSW5mbygpO1xyXG5cdFx0XHR0aGlzLmNvZGVtaXJyb3Iuc2V0VmFsdWUoVnZ2ZWIuQnVpbGRlci5nZXRCZWF1dGlmaWVkSHRtbCgpKTtcclxuXHRcdFx0dGhpcy5jb2RlbWlycm9yLnNjcm9sbFRvKHNjcm9sbEluZm8ubGVmdCwgc2Nyb2xsSW5mby50b3ApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdC8qXHJcblx0XHQvL3NhdmUgbWVtb3J5IGJ5IGRlc3Ryb3lpbmcgYnV0IGxvc2Ugc2Nyb2xsIG9uIGVkaXRvciB0b2dnbGVcclxuXHRcdHRoaXMuY29kZW1pcnJvci50b1RleHRBcmVhKCk7XHJcblx0XHR0aGlzLmNvZGVtaXJyb3IgPSBmYWxzZTtcclxuXHRcdCovIFxyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAodGhpcy5pc0FjdGl2ZSAhPSB0cnVlKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5pdCgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5kZXN0cm95KCk7XHJcblx0fVxyXG59XHJcbiJdfQ==
