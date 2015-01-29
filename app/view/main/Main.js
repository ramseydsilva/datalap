var vPanel = Ext.create('Ext.panel.Panel', {

    requires: [
        'Ext.layout.container.HBox'
    ],
    width: '100%',
    height: '100%',
    
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
        
    defaults: {
        frame: true,
        margin: 10,
        cmargin: 0
    },

    items: [{
        title: "Tree",
        collapsible: true,
        collapseDirection: 'left',
        flex: 3,
        items:[{
            region: 'north',
            height: 1000,
            xtype: 'maintree'
        }]
    }, {
        title: 'Visualizer',
        flex: 2,
        collapsible: true,
        collapseDirection: 'right'
    }, {
        title: 'Editor',
        collapsible: true,
        collapseDirection: 'right',
        flex: 1
    }]
});

Ext.define('datalap.view.main.Main', {
    extend: 'Ext.container.Container',
    
    requires: [
        'datalap.view.main.MainController',
        'datalap.view.main.MainModel'
    ],

    plugins: 'viewport',
    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        region: 'north',
        xtype: 'header',
        title: "DataLap",
        defaults: {
            margin: '10px'
        },
        items: [{
            xtype: 'button',
            text: 'Logout',
            handler: 'onClickButton'
        }]
        
    }, {
        region: 'west',
        width: '100%',
        xtype: 'panel',
        items: [vPanel]
    }]
});
