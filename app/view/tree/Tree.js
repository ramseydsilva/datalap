var tree;
var cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
    listeners: {
        edit: function(editor, e) {
            console.log("edited, commit to server");
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
            var child = node.appendChild({
                name: "Child",
                leaf: true
            });
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
            node.remove();
        }
   }]
});


var store = Ext.create('Ext.data.TreeStore', {
    model: 'datalap.model.Node',
    rootVisible: false,
    listeners: {
        beforeload: function(store, operation, eOpts) {
            var node = operation.node;
            if (node.get("id") == "root") {
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
    title: 'DataMap',
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
        }
    }
    
});