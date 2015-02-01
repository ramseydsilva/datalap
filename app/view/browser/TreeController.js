var menu = Ext.create('Ext.menu.Menu', {
   width: 150,
   plain: true,
   floating: true,
   items: [{
        text: "Add Child",
        handler: function() {
            var node = tree.getSelection()[0];
            var childNode = Ext.create("datalap.model.Node", {
                leaf: true,
                parents: [node.get("_id")]
            });
            childNode.save({
                success: function(child) {
                    child.set("_id", newId);
                    node.appendChild(child);
                    node.expand(false, function() {
                        tree.getSelectionModel().select(child);
                        tree.getView().focusRow(child);
                    });
                }
            });
        }
   }, {
        text: "Edit",
        handler: function() {
            var node = tree.getSelection()[0];
            cellEditor.startEdit(node, 0);
        }
   }, {
        text: "Delete",
        handler: function() {
            var node = tree.getSelection()[0];
            node.erase();
        }
   }]
});

Ext.define('datalap.view.browser.TreeController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.tree',
    
    rightclick: function(that, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        e.stopEvent();
        menu.showAt(e.getXY());
        tree.getSelectionModel().select(record);
    },
    
    cellclick: function(that, td, cellIndex, record, tr, rowIndex, e, eOpts ) {        
        if (e.event.ctrlKey) {
            selectedNodeY = record;
        }
        if (e.target.tagName != "IMG") {
            if (!record.isLoaded()) {
                that.store.load({node: record, onChildNodesAvailable: function(records, recursive, callback, scope) {
                    record.set('expanded', true);
                    record.set('expanded', false);
                }});
            }
        }
    },
    
    selectionchange: function(model, records) {
        var rec = records[0];
        if (rec) {
            selectedNode = rec;
            Ext.global.editorform.loadRecord(rec);
        }
    }
    
});
