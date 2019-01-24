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
import Vvveb from './components';

export default Undo = {
	undos: [],
	mutations: [],
	undoIndex: -1,
	enabled: true,
	// init: function() {
	// },
	clearMutations() {
		this.mutations = [];
		this.undoIndex = -1;
	},
	addMutation(mutation) {
		Vvveb.Builder.frameBody.trigger("Undo.add");
		this.mutations.splice(++this.undoIndex, 0, mutation);
	},
	getMutations() {
		return this.mutations;
	},
	restore(mutation, undo) {
		if (undo) {
			mutation.undo();
		} else {
			mutation.redo();
		}
		Vvveb.Builder.frameBody.trigger("Undo.restore");
	},
	undo() {
		if (this.undoIndex >= 0) {
			this.restore(this.mutations[this.undoIndex--], true);
		}
	},
	redo() {
		if (this.undoIndex < this.mutations.length - 1) {
			this.restore(this.mutations[++this.undoIndex], false);
		}
	},
	hasChanges() {
		return this.mutations.length;
	}
}
