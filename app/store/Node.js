Ext.define('datalap.store.Node', {
                                       
    extend: 'Ext.data.TreeStore',
    model: 'datalap.model.Node',
    rootVisible: false,

    autoSync: true,
    
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