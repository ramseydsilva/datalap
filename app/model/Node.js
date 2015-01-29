Ext.define("datalap.model.Node", {
    extend: "Ext.data.Model",
    
    fields: [
        //{ name: 'id', type: 'int', persist: false },
        { name: 'name', type: 'string', persist: true, defaultValue: '1' },
        { name: 'value', type: 'int', persist: true, defaultValue: 1 },
        { name: 'calc', type: 'string', persist: true, defaultValue: '1' },
        { name: 'type', type: 'string', persist: true, defaultValue: '1' }
        //{ name: 'children', type: 'array' },
        //{ name: 'parents', type: 'array' },
        //{ name: 'attributes', type: 'object' }
    ],
    
    proxy: {
        type: 'rest',
        url: "http://localhost:3000/datalap/nodes",
        appendId: false,
        reader: {
            type: 'json',
            transform: {
                fn: function(data) {
                    data.forEach(function(node) {
                        node.oriChildren = node.children;
                        delete node.children;
                        if (node.oriChildren.length) {
                            node.leaf = false;
                        } else {
                            node.leaf = true;
                        }
                    });
                    return data;
                }
            }
        }
    }
});