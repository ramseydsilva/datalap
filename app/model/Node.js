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
        { name: 'oriChildren', persist: false, type: 'string' },
        { name: 'parents', type: "auto" }, // convert to array
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