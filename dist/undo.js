require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({185:[function(require,module,exports){
var _builder = require('./builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_builder2.default.Undo = {

	undos: [],
	mutations: [],
	undoIndex: -1,
	enabled: true,
	/*		
 init: function() {
 },
 */
	addMutation: function addMutation(mutation) {
		/*
  	this.mutations.push(mutation);
  	this.undoIndex++;
  */
		_builder2.default.Builder.frameBody.trigger("vvveb.undo.add");
		this.mutations.splice(++this.undoIndex, 0, mutation);
	},
	restore: function restore(mutation, undo) {

		switch (mutation.type) {
			case 'childList':

				if (undo == true) {
					addedNodes = mutation.removedNodes;
					removedNodes = mutation.addedNodes;
				} else //redo
					{
						addedNodes = mutation.addedNodes;
						removedNodes = mutation.removedNodes;
					}

				if (addedNodes) for (i in addedNodes) {
					node = addedNodes[i];
					if (mutation.nextSibling) {
						mutation.nextSibling.parentNode.insertBefore(node, mutation.nextSibling);
					} else {
						mutation.target.append(node);
					}
				}

				if (removedNodes) for (i in removedNodes) {
					node = removedNodes[i];
					node.parentNode.removeChild(node);
				}
				break;
			case 'move':
				if (undo == true) {
					parent = mutation.oldParent;
					sibling = mutation.oldNextSibling;
				} else //redo
					{
						parent = mutation.newParent;
						sibling = mutation.newNextSibling;
					}

				if (sibling) {
					sibling.parentNode.insertBefore(mutation.target, sibling);
				} else {
					parent.append(node);
				}
				break;
			case 'characterData':
				mutation.target.innerHTML = undo ? mutation.oldValue : mutation.newValue;
				break;
			case 'attributes':
				value = undo ? mutation.oldValue : mutation.newValue;

				if (value || value === false || value === 0) mutation.target.setAttribute(mutation.attributeName, value);else mutation.target.removeAttribute(mutation.attributeName);

				break;
		}

		_builder2.default.Builder.frameBody.trigger("vvveb.undo.restore");
	},
	undo: function undo() {
		if (this.undoIndex >= 0) {
			this.restore(this.mutations[this.undoIndex--], true);
		}
	},
	redo: function redo() {
		if (this.undoIndex < this.mutations.length - 1) {
			this.restore(this.mutations[++this.undoIndex], false);
		}
	},
	hasChanges: function hasChanges() {
		return this.mutations.length;
	}
}; /*
   Copyright 2017 Ziadin Givan
   
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
   
      http://www.apache.org/licenses/LICENSE-2.0
   
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   
   https://github.com/givanz/VvvebJs
   */

/*
https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

childList 				Set to true if additions and removals of the target node's child elements (including text nodes) are to be observed.
attributes 				Set to true if mutations to target's attributes are to be observed.
characterData 			Set to true if mutations to target's data are to be observed.
subtree 				Set to true if mutations to target and target's descendants are to be observed.
attributeOldValue 		Set to true if attributes is set to true and target's attribute value before the mutation needs to be recorded.
characterDataOldValue 	Set to true if characterData is set to true and target's data before the mutation needs to be recorded.
attributeFilter 		Set to an array of attribute local names (without namespace) if not all attribute mutations need to be observed.
*/

/*
MutationRecord.type				 	String 		Returns "attributes" if the mutation was an attribute mutation,
												"characterData" if it was a mutation to a CharacterData node,
												and "childList" if it was a mutation to the tree of nodes.

MutationRecord.target 				Node 		Returns the node the mutation affected, depending on the MutationRecord.type.
												For attributes, it is the element whose attribute changed.
												For characterData, it is the CharacterData node.
												For childList, it is the node whose children changed.

MutationRecord.addedNodes 			NodeList 	Return the nodes added. Will be an empty NodeList if no nodes were added.
MutationRecord.removedNodes 		NodeList 	Return the nodes removed. Will be an empty NodeList if no nodes were removed.
MutationRecord.previousSibling 		Node 		Return the previous sibling of the added or removed nodes, or null.
MutationRecord.nextSibling 			Node 		Return the next sibling of the added or removed nodes, or null.
MutationRecord.attributeName 		String 		Returns the local name of the changed attribute, or null.
MutationRecord.attributeNamespace 	String 		Returns the namespace of the changed attribute, or null.
MutationRecord.oldValue 			String 		The return value depends on the MutationRecord.type.
												For attributes, it is the value of the changed attribute before the change.
												For characterData, it is the data of the changed node before the change.
												For childList, it is null.
*/

},{"./builder":58}]},{},[185])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHVuZG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNtREE7Ozs7OztBQUVBLGtCQUFNLElBQU4sR0FBYTs7QUFFWixRQUFPLEVBRks7QUFHWixZQUFXLEVBSEM7QUFJWixZQUFXLENBQUMsQ0FKQTtBQUtaLFVBQVMsSUFMRztBQU1aOzs7O0FBSUEsWUFWWSx1QkFVQSxRQVZBLEVBVVU7QUFDckI7Ozs7QUFJQSxvQkFBTSxPQUFOLENBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFnQyxnQkFBaEM7QUFDQSxPQUFLLFNBQUwsQ0FBZSxNQUFmLENBQXNCLEVBQUUsS0FBSyxTQUE3QixFQUF3QyxDQUF4QyxFQUEyQyxRQUEzQztBQUNBLEVBakJXO0FBbUJaLFFBbkJZLG1CQW1CSixRQW5CSSxFQW1CTSxJQW5CTixFQW1CWTs7QUFFdkIsVUFBUSxTQUFTLElBQWpCO0FBQ0MsUUFBSyxXQUFMOztBQUVDLFFBQUksUUFBUSxJQUFaLEVBQWtCO0FBQ2pCLGtCQUFhLFNBQVMsWUFBdEI7QUFDQSxvQkFBZSxTQUFTLFVBQXhCO0FBQ0EsS0FIRCxNQUdPO0FBQ1A7QUFDQyxtQkFBYSxTQUFTLFVBQXRCO0FBQ0EscUJBQWUsU0FBUyxZQUF4QjtBQUNBOztBQUVELFFBQUksVUFBSixFQUFnQixLQUFLLENBQUwsSUFBVSxVQUFWLEVBQXNCO0FBQ3JDLFlBQU8sV0FBVyxDQUFYLENBQVA7QUFDQSxTQUFJLFNBQVMsV0FBYixFQUEwQjtBQUN6QixlQUFTLFdBQVQsQ0FBcUIsVUFBckIsQ0FBZ0MsWUFBaEMsQ0FBNkMsSUFBN0MsRUFBbUQsU0FBUyxXQUE1RDtBQUNBLE1BRkQsTUFFTztBQUNOLGVBQVMsTUFBVCxDQUFnQixNQUFoQixDQUF1QixJQUF2QjtBQUNBO0FBQ0Q7O0FBRUQsUUFBSSxZQUFKLEVBQWtCLEtBQUssQ0FBTCxJQUFVLFlBQVYsRUFBd0I7QUFDekMsWUFBTyxhQUFhLENBQWIsQ0FBUDtBQUNBLFVBQUssVUFBTCxDQUFnQixXQUFoQixDQUE0QixJQUE1QjtBQUNBO0FBQ0Q7QUFDRCxRQUFLLE1BQUw7QUFDQyxRQUFJLFFBQVEsSUFBWixFQUFrQjtBQUNqQixjQUFTLFNBQVMsU0FBbEI7QUFDQSxlQUFVLFNBQVMsY0FBbkI7QUFDQSxLQUhELE1BR087QUFDUDtBQUNDLGVBQVMsU0FBUyxTQUFsQjtBQUNBLGdCQUFVLFNBQVMsY0FBbkI7QUFDQTs7QUFFRCxRQUFJLE9BQUosRUFBYTtBQUNaLGFBQVEsVUFBUixDQUFtQixZQUFuQixDQUFnQyxTQUFTLE1BQXpDLEVBQWlELE9BQWpEO0FBQ0EsS0FGRCxNQUVPO0FBQ04sWUFBTyxNQUFQLENBQWMsSUFBZDtBQUNBO0FBQ0Q7QUFDRCxRQUFLLGVBQUw7QUFDQyxhQUFTLE1BQVQsQ0FBZ0IsU0FBaEIsR0FBNEIsT0FBTyxTQUFTLFFBQWhCLEdBQTJCLFNBQVMsUUFBaEU7QUFDQTtBQUNELFFBQUssWUFBTDtBQUNDLFlBQVEsT0FBTyxTQUFTLFFBQWhCLEdBQTJCLFNBQVMsUUFBNUM7O0FBRUEsUUFBSSxTQUFTLFVBQVUsS0FBbkIsSUFBNEIsVUFBVSxDQUExQyxFQUNDLFNBQVMsTUFBVCxDQUFnQixZQUFoQixDQUE2QixTQUFTLGFBQXRDLEVBQXFELEtBQXJELEVBREQsS0FHQyxTQUFTLE1BQVQsQ0FBZ0IsZUFBaEIsQ0FBZ0MsU0FBUyxhQUF6Qzs7QUFFRDtBQXJERjs7QUF3REEsb0JBQU0sT0FBTixDQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FBZ0Msb0JBQWhDO0FBQ0EsRUE5RVc7QUFnRlosS0FoRlksa0JBZ0ZMO0FBQ04sTUFBSSxLQUFLLFNBQUwsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDeEIsUUFBSyxPQUFMLENBQWEsS0FBSyxTQUFMLENBQWUsS0FBSyxTQUFMLEVBQWYsQ0FBYixFQUErQyxJQUEvQztBQUNBO0FBQ0QsRUFwRlc7QUFzRlosS0F0Rlksa0JBc0ZMO0FBQ04sTUFBSSxLQUFLLFNBQUwsR0FBaUIsS0FBSyxTQUFMLENBQWUsTUFBZixHQUF3QixDQUE3QyxFQUFnRDtBQUMvQyxRQUFLLE9BQUwsQ0FBYSxLQUFLLFNBQUwsQ0FBZSxFQUFFLEtBQUssU0FBdEIsQ0FBYixFQUErQyxLQUEvQztBQUNBO0FBQ0QsRUExRlc7QUE0RlosV0E1Rlksd0JBNEZDO0FBQ1osU0FBTyxLQUFLLFNBQUwsQ0FBZSxNQUF0QjtBQUNBO0FBOUZXLENBQWIsQyxDQXJEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBOzs7Ozs7Ozs7Ozs7QUFZQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxyXG5Db3B5cmlnaHQgMjAxNyBaaWFkaW4gR2l2YW5cclxuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblxyXG4gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuXHJcbmh0dHBzOi8vZ2l0aHViLmNvbS9naXZhbnovVnZ2ZWJKc1xyXG4qL1xyXG5cclxuLypcclxuaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL011dGF0aW9uT2JzZXJ2ZXJcclxuXHJcbmNoaWxkTGlzdCBcdFx0XHRcdFNldCB0byB0cnVlIGlmIGFkZGl0aW9ucyBhbmQgcmVtb3ZhbHMgb2YgdGhlIHRhcmdldCBub2RlJ3MgY2hpbGQgZWxlbWVudHMgKGluY2x1ZGluZyB0ZXh0IG5vZGVzKSBhcmUgdG8gYmUgb2JzZXJ2ZWQuXHJcbmF0dHJpYnV0ZXMgXHRcdFx0XHRTZXQgdG8gdHJ1ZSBpZiBtdXRhdGlvbnMgdG8gdGFyZ2V0J3MgYXR0cmlidXRlcyBhcmUgdG8gYmUgb2JzZXJ2ZWQuXHJcbmNoYXJhY3RlckRhdGEgXHRcdFx0U2V0IHRvIHRydWUgaWYgbXV0YXRpb25zIHRvIHRhcmdldCdzIGRhdGEgYXJlIHRvIGJlIG9ic2VydmVkLlxyXG5zdWJ0cmVlIFx0XHRcdFx0U2V0IHRvIHRydWUgaWYgbXV0YXRpb25zIHRvIHRhcmdldCBhbmQgdGFyZ2V0J3MgZGVzY2VuZGFudHMgYXJlIHRvIGJlIG9ic2VydmVkLlxyXG5hdHRyaWJ1dGVPbGRWYWx1ZSBcdFx0U2V0IHRvIHRydWUgaWYgYXR0cmlidXRlcyBpcyBzZXQgdG8gdHJ1ZSBhbmQgdGFyZ2V0J3MgYXR0cmlidXRlIHZhbHVlIGJlZm9yZSB0aGUgbXV0YXRpb24gbmVlZHMgdG8gYmUgcmVjb3JkZWQuXHJcbmNoYXJhY3RlckRhdGFPbGRWYWx1ZSBcdFNldCB0byB0cnVlIGlmIGNoYXJhY3RlckRhdGEgaXMgc2V0IHRvIHRydWUgYW5kIHRhcmdldCdzIGRhdGEgYmVmb3JlIHRoZSBtdXRhdGlvbiBuZWVkcyB0byBiZSByZWNvcmRlZC5cclxuYXR0cmlidXRlRmlsdGVyIFx0XHRTZXQgdG8gYW4gYXJyYXkgb2YgYXR0cmlidXRlIGxvY2FsIG5hbWVzICh3aXRob3V0IG5hbWVzcGFjZSkgaWYgbm90IGFsbCBhdHRyaWJ1dGUgbXV0YXRpb25zIG5lZWQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiovXHJcblxyXG4vKlxyXG5NdXRhdGlvblJlY29yZC50eXBlXHRcdFx0XHQgXHRTdHJpbmcgXHRcdFJldHVybnMgXCJhdHRyaWJ1dGVzXCIgaWYgdGhlIG11dGF0aW9uIHdhcyBhbiBhdHRyaWJ1dGUgbXV0YXRpb24sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiY2hhcmFjdGVyRGF0YVwiIGlmIGl0IHdhcyBhIG11dGF0aW9uIHRvIGEgQ2hhcmFjdGVyRGF0YSBub2RlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhbmQgXCJjaGlsZExpc3RcIiBpZiBpdCB3YXMgYSBtdXRhdGlvbiB0byB0aGUgdHJlZSBvZiBub2Rlcy5cclxuXHJcbk11dGF0aW9uUmVjb3JkLnRhcmdldCBcdFx0XHRcdE5vZGUgXHRcdFJldHVybnMgdGhlIG5vZGUgdGhlIG11dGF0aW9uIGFmZmVjdGVkLCBkZXBlbmRpbmcgb24gdGhlIE11dGF0aW9uUmVjb3JkLnR5cGUuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdEZvciBhdHRyaWJ1dGVzLCBpdCBpcyB0aGUgZWxlbWVudCB3aG9zZSBhdHRyaWJ1dGUgY2hhbmdlZC5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Rm9yIGNoYXJhY3RlckRhdGEsIGl0IGlzIHRoZSBDaGFyYWN0ZXJEYXRhIG5vZGUuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdEZvciBjaGlsZExpc3QsIGl0IGlzIHRoZSBub2RlIHdob3NlIGNoaWxkcmVuIGNoYW5nZWQuXHJcblxyXG5NdXRhdGlvblJlY29yZC5hZGRlZE5vZGVzIFx0XHRcdE5vZGVMaXN0IFx0UmV0dXJuIHRoZSBub2RlcyBhZGRlZC4gV2lsbCBiZSBhbiBlbXB0eSBOb2RlTGlzdCBpZiBubyBub2RlcyB3ZXJlIGFkZGVkLlxyXG5NdXRhdGlvblJlY29yZC5yZW1vdmVkTm9kZXMgXHRcdE5vZGVMaXN0IFx0UmV0dXJuIHRoZSBub2RlcyByZW1vdmVkLiBXaWxsIGJlIGFuIGVtcHR5IE5vZGVMaXN0IGlmIG5vIG5vZGVzIHdlcmUgcmVtb3ZlZC5cclxuTXV0YXRpb25SZWNvcmQucHJldmlvdXNTaWJsaW5nIFx0XHROb2RlIFx0XHRSZXR1cm4gdGhlIHByZXZpb3VzIHNpYmxpbmcgb2YgdGhlIGFkZGVkIG9yIHJlbW92ZWQgbm9kZXMsIG9yIG51bGwuXHJcbk11dGF0aW9uUmVjb3JkLm5leHRTaWJsaW5nIFx0XHRcdE5vZGUgXHRcdFJldHVybiB0aGUgbmV4dCBzaWJsaW5nIG9mIHRoZSBhZGRlZCBvciByZW1vdmVkIG5vZGVzLCBvciBudWxsLlxyXG5NdXRhdGlvblJlY29yZC5hdHRyaWJ1dGVOYW1lIFx0XHRTdHJpbmcgXHRcdFJldHVybnMgdGhlIGxvY2FsIG5hbWUgb2YgdGhlIGNoYW5nZWQgYXR0cmlidXRlLCBvciBudWxsLlxyXG5NdXRhdGlvblJlY29yZC5hdHRyaWJ1dGVOYW1lc3BhY2UgXHRTdHJpbmcgXHRcdFJldHVybnMgdGhlIG5hbWVzcGFjZSBvZiB0aGUgY2hhbmdlZCBhdHRyaWJ1dGUsIG9yIG51bGwuXHJcbk11dGF0aW9uUmVjb3JkLm9sZFZhbHVlIFx0XHRcdFN0cmluZyBcdFx0VGhlIHJldHVybiB2YWx1ZSBkZXBlbmRzIG9uIHRoZSBNdXRhdGlvblJlY29yZC50eXBlLlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRGb3IgYXR0cmlidXRlcywgaXQgaXMgdGhlIHZhbHVlIG9mIHRoZSBjaGFuZ2VkIGF0dHJpYnV0ZSBiZWZvcmUgdGhlIGNoYW5nZS5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Rm9yIGNoYXJhY3RlckRhdGEsIGl0IGlzIHRoZSBkYXRhIG9mIHRoZSBjaGFuZ2VkIG5vZGUgYmVmb3JlIHRoZSBjaGFuZ2UuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdEZvciBjaGlsZExpc3QsIGl0IGlzIG51bGwuXHJcbiovXHJcbmltcG9ydCBWdnZlYiBmcm9tICcuL2J1aWxkZXInO1xyXG5cclxuVnZ2ZWIuVW5kbyA9IHtcclxuXHJcblx0dW5kb3M6IFtdLFxyXG5cdG11dGF0aW9uczogW10sXHJcblx0dW5kb0luZGV4OiAtMSxcclxuXHRlbmFibGVkOiB0cnVlLFxyXG5cdC8qXHRcdFxyXG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdH0sXHJcblx0Ki9cclxuXHRhZGRNdXRhdGlvbihtdXRhdGlvbikge1xyXG5cdFx0LypcclxuXHRcdFx0dGhpcy5tdXRhdGlvbnMucHVzaChtdXRhdGlvbik7XHJcblx0XHRcdHRoaXMudW5kb0luZGV4Kys7XHJcblx0XHQqL1xyXG5cdFx0VnZ2ZWIuQnVpbGRlci5mcmFtZUJvZHkudHJpZ2dlcihcInZ2dmViLnVuZG8uYWRkXCIpO1xyXG5cdFx0dGhpcy5tdXRhdGlvbnMuc3BsaWNlKCsrdGhpcy51bmRvSW5kZXgsIDAsIG11dGF0aW9uKTtcclxuXHR9LFxyXG5cclxuXHRyZXN0b3JlKG11dGF0aW9uLCB1bmRvKSB7XHJcblxyXG5cdFx0c3dpdGNoIChtdXRhdGlvbi50eXBlKSB7XHJcblx0XHRcdGNhc2UgJ2NoaWxkTGlzdCc6XHJcblxyXG5cdFx0XHRcdGlmICh1bmRvID09IHRydWUpIHtcclxuXHRcdFx0XHRcdGFkZGVkTm9kZXMgPSBtdXRhdGlvbi5yZW1vdmVkTm9kZXM7XHJcblx0XHRcdFx0XHRyZW1vdmVkTm9kZXMgPSBtdXRhdGlvbi5hZGRlZE5vZGVzO1xyXG5cdFx0XHRcdH0gZWxzZSAvL3JlZG9cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhZGRlZE5vZGVzID0gbXV0YXRpb24uYWRkZWROb2RlcztcclxuXHRcdFx0XHRcdHJlbW92ZWROb2RlcyA9IG11dGF0aW9uLnJlbW92ZWROb2RlcztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChhZGRlZE5vZGVzKSBmb3IgKGkgaW4gYWRkZWROb2Rlcykge1xyXG5cdFx0XHRcdFx0bm9kZSA9IGFkZGVkTm9kZXNbaV07XHJcblx0XHRcdFx0XHRpZiAobXV0YXRpb24ubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0XHRcdFx0bXV0YXRpb24ubmV4dFNpYmxpbmcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgbXV0YXRpb24ubmV4dFNpYmxpbmcpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0bXV0YXRpb24udGFyZ2V0LmFwcGVuZChub2RlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChyZW1vdmVkTm9kZXMpIGZvciAoaSBpbiByZW1vdmVkTm9kZXMpIHtcclxuXHRcdFx0XHRcdG5vZGUgPSByZW1vdmVkTm9kZXNbaV07XHJcblx0XHRcdFx0XHRub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdtb3ZlJzpcclxuXHRcdFx0XHRpZiAodW5kbyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRwYXJlbnQgPSBtdXRhdGlvbi5vbGRQYXJlbnQ7XHJcblx0XHRcdFx0XHRzaWJsaW5nID0gbXV0YXRpb24ub2xkTmV4dFNpYmxpbmc7XHJcblx0XHRcdFx0fSBlbHNlIC8vcmVkb1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHBhcmVudCA9IG11dGF0aW9uLm5ld1BhcmVudDtcclxuXHRcdFx0XHRcdHNpYmxpbmcgPSBtdXRhdGlvbi5uZXdOZXh0U2libGluZztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChzaWJsaW5nKSB7XHJcblx0XHRcdFx0XHRzaWJsaW5nLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG11dGF0aW9uLnRhcmdldCwgc2libGluZyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHBhcmVudC5hcHBlbmQobm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdjaGFyYWN0ZXJEYXRhJzpcclxuXHRcdFx0XHRtdXRhdGlvbi50YXJnZXQuaW5uZXJIVE1MID0gdW5kbyA/IG11dGF0aW9uLm9sZFZhbHVlIDogbXV0YXRpb24ubmV3VmFsdWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2F0dHJpYnV0ZXMnOlxyXG5cdFx0XHRcdHZhbHVlID0gdW5kbyA/IG11dGF0aW9uLm9sZFZhbHVlIDogbXV0YXRpb24ubmV3VmFsdWU7XHJcblxyXG5cdFx0XHRcdGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IDApXHJcblx0XHRcdFx0XHRtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUsIHZhbHVlKTtcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRtdXRhdGlvbi50YXJnZXQucmVtb3ZlQXR0cmlidXRlKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpO1xyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0XHRWdnZlYi5CdWlsZGVyLmZyYW1lQm9keS50cmlnZ2VyKFwidnZ2ZWIudW5kby5yZXN0b3JlXCIpO1xyXG5cdH0sXHJcblxyXG5cdHVuZG8oKSB7XHJcblx0XHRpZiAodGhpcy51bmRvSW5kZXggPj0gMCkge1xyXG5cdFx0XHR0aGlzLnJlc3RvcmUodGhpcy5tdXRhdGlvbnNbdGhpcy51bmRvSW5kZXgtLV0sIHRydWUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHJlZG8oKSB7XHJcblx0XHRpZiAodGhpcy51bmRvSW5kZXggPCB0aGlzLm11dGF0aW9ucy5sZW5ndGggLSAxKSB7XHJcblx0XHRcdHRoaXMucmVzdG9yZSh0aGlzLm11dGF0aW9uc1srK3RoaXMudW5kb0luZGV4XSwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGhhc0NoYW5nZXMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tdXRhdGlvbnMubGVuZ3RoO1xyXG5cdH0sXHJcbn07XHJcbiJdfQ==
