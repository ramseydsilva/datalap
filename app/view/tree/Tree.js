var tree, store, newId;
var cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
    listeners: {
        edit: function(editor, e) {
            store.sync();
        }
    }
});

Ext.define("datalap.model.Node", {
    extend: "Ext.data.Model",
    
    idProperty: "_id",
    
    fields: [
        { name: '_id', persist: false },
        { name: 'name', type: 'string', persist: true, defaultValue: 'Child' },
        { name: 'value', type: 'int', persist: true, defaultValue: null },
        { name: 'calc', type: 'string', persist: true, defaultValue: null },
        { name: 'type', type: 'string', persist: true, defaultValue: null },
        { name: 'leaf', persist: false },
        { name: 'parentId', persist: false },
        { name: 'oriChildren', type: 'string' },
        { name: 'parents', type: 'string' },
        { name: 'attributes', type: 'string' }
    ],
    
    proxy: {
        type: 'rest',
        url: "http://localhost:3000/datalap/nodes",
        
        reader: {
            type: 'json',
            transform: {
                fn: function(data) {
                    
                    newId = data._id;
                    
                    if (data.forEach) {
                        data.forEach(function(node) {
                            node.leaf = true;
                            if (node.children) {
                                node.oriChildren = node.children;
                                delete node.children;
                                if (node.oriChildren.length) {
                                    node.leaf = false;
                                }
                            }
                        });
                    }
                    
                    return data;
                },
                scope: this
            }
        }
    }
});

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
                success: function(n) {
                    n.set("_id", newId);
                }
            });
            var child = node.appendChild(childNode);
            node.expand(false, function() {
                tree.getSelectionModel().select(child);
                tree.getView().focusRow(child);
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


store = Ext.create('Ext.data.TreeStore', {
    model: 'datalap.model.Node',
    rootVisible: false,
    listeners: {
        beforeload: function(store, operation, eOpts) {
            var node = operation.node;
            if (node.get("_id") == "root") {
                var params = {"query": '{"parents":[]}'};
            } else {
                var params = {"query": '{"parents": {"$in": ["' + node.get("_id") + '"]} }'};
            }
            operation.setParams(params);
        }
    }
});

Ext.define("datalap.view.tree.Tree", {
           
    extend: 'Ext.tree.Panel',
    alias: "widget.maintree",
    rootVisible: false,
    store: store,
    focusable: false,
    plugins: [ cellEditor ],
    
    columns: [{
        xtype: 'treecolumn',
        dataIndex: 'name',
        flex: 1,
        editor: {
            xtype: 'textfield'
        }
    }],
    
    listeners: {
        
        cellcontextmenu: function(that, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            e.stopEvent();
            menu.showAt(e.getXY());
        },
        
        viewready: function(that, eOpts) {
            tree = that;
        },
        
        selectionChange: function(model, records) {
            var rec = records[0];
            if (rec) {
                Ext.global.editorform.loadRecord(rec);
            }
        }
    }
        
});