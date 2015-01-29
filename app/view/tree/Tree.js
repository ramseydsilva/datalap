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
    
    columns: [{
        xtype: 'treecolumn',
        dataIndex: 'name',
        flex: 1
    }]
    
});