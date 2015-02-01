Ext.define('datalap.view.visualizer.Sheet', {

    extend: 'Ext.container.Container',
    alias: 'widget.visualizer',
    controller: 'visualizer',

    requires: [
        'datalap.view.visualizer.SheetController',
    ],
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [{
        region: 'north',
        xtype: 'panel',
        id: 'sheet'
    }]
    
});