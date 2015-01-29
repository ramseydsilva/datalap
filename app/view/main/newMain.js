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
    
    bodyPadding: 10,
    
    defaults: {
        frame: true,
        bodyPadding: 10
    },

    items: [
        /*
        {
            title: 'Panel 1',
            flex: 1,
            margin: '0 10 0 0',
            html: 'flex : 1',
            collapsible: true,
            collapsibleDirection: ''
        },
        {
            title: 'Panel 2',
            width: 100,
            margin: '0 10 0 0',
            html: 'width : 100'
        },
        {
            title: 'Panel 3',
            flex: 2,
            html: 'flex : 2'
        }*/
        
        {
        title: "Tree",
        collapsible: true,
        collapseDirection: 'left',
        flex: 1,
        items:[{
            region: 'north',
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
        flex: 3
    }
        
    ]
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
        region: 'center',
        height: '100%',
        xtype: 'panel',
        items: [vPanel]
    }]
});
