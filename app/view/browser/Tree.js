var tree,
    store,
    newId, selectedNode, selectedNodeY,
    cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
        listeners: {
            edit: function(editor, e) {
                store.sync();
                Ext.global.editorform.loadRecord(selectedNode);
            }
        }
    });

Ext.define("datalap.view.browser.Tree", {
           
    extend: 'Ext.tree.Panel',
    alias: "widget.tree",
    rootVisible: false,
    store: "Node",
    focusable: false,
    plugins: [cellEditor],
    viewConfig: {plugins: {
        ptype: 'treeviewdragdrop',
        dragGroup: 'treegrid',
        dropGroup: 'treegrid'
    }},

    requires: [
        'datalap.view.browser.TreeController',
        'Ext.tree.plugin.TreeViewDragDrop'
    ],
        
    controller: 'tree',
    
    columns: [{
        xtype: 'treecolumn',
        dataIndex: 'name',
        flex: 1,
        editor: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'actioncolumn',
        items: [{
            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                if (r.xChecked) {
                    return 'x-tree-checkbox x-tree-checkbox-checked';
                }
                return 'x-tree-checkbox';
            },
            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                var el = Ext.get(e.target);
                if (record.xChecked) {
                    var index = X.indexOf(record);
                    if (index != -1) {
                        X.splice(index, 1);
                    }
                    record.xChecked = false;
                    el.removeCls("x-tree-checkbox-checked");
                } else {
                    X.push(record);
                    record.xChecked = true;
                }
                Ext.ComponentQuery.query("visualizer")[0].controller.visualize();
            }
        }, {
            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                if (r.yChecked) {
                    return 'x-tree-checkbox x-tree-checkbox-checked';
                }
                return 'x-tree-checkbox';
            },
            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                var el = Ext.get(e.target);
                if (record.yChecked) {
                    var index = Y.indexOf(record);
                    if (index != -1) {
                        Y.splice(index, 1);
                    }
                    record.yChecked = false;
                    el.removeCls("x-tree-checkbox-checked");
                } else {
                    Y.push(record);
                    record.yChecked = true;
                }
                Ext.ComponentQuery.query("visualizer")[0].controller.visualize();
            }
        }]
    }],
    
    listeners: {
        
        cellcontextmenu: 'rightclick',
        viewready: function(that, eOpts) {
            tree = that;
            that.view.on("beforedrop", function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
                
                if (data.records[0].get("name")) {
                    // Dragged from tree
                    var dragged = data.records[0];
                    var oldParentId = dragged.parentNode.get("_id");
                } else {
                    // Dragged from visualizer
                    dropHandlers.cancelDrop();
                    var dragged = selectedCell;
                }
                
                if (overModel && dragged) {
                    var parents = [];
                    parents = parents.concat(dragged.get("parents"));
                    var oldParentIndex = parents.indexOf(oldParentId);
                    if (oldParentId && oldParentIndex != -1) {
                        parents.splice(oldParentIndex, 1);
                    }
                    var newParentId = overModel.get("_id");
                    if (parents.indexOf(newParentId) == -1) {
                        parents.push(newParentId);
                        dragged.set("parents", parents);
                        dragged.save();
                    }
                    Ext.global.editorform.loadRecord(dragged);
                }
            });
        },
        selectionChange: 'selectionchange',
        cellclick: 'cellclick'
    }
        
});