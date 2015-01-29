Ext.define("datalap.model.Node", {
    extend: "Ext.data.Model",
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'value', type: 'int' },
        { name: 'calc', type: 'string' },
        { name: 'type', type: 'string' }
        //{ name: 'children', type: 'array' },
        //{ name: 'parents', type: 'array' },
        //{ name: 'attributes', type: 'object' }
    ],
    proxy: {
        type: 'rest',
        url: "/datalap/nodes",
        reader: {
            type: 'json'
        }
    }
});