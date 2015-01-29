var store = Ext.create('Ext.data.TreeStore', {
    model: 'datalap.model.Node'
});

Ext.define("datalap.view.tree.Tree", {
           
    extend: 'Ext.tree.Panel',
    
    alias: "widget.maintree",
    
    title: 'Map',
    rootVisible: false,
    
    //store: store,
    width: 300,
    height: 250
    
});