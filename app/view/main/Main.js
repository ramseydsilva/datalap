Ext.define('datalap.view.main.Main', {
    extend: 'Ext.container.Container',
    
    requires: [
        'datalap.view.main.Editor',
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
        title: "Tree",
        xtype: 'panel',
        split: true,
        items:[{
            region: 'north',
            xtype: 'maintree'
        }]
    }, {
        xtype: 'panel',
        bind: {
            title: 'Visualizer'
        },
        region: 'east',
        collapsible: true,
        width: 250,
        split: true
    }, {
        xtype: 'panel',
        title: 'Editor',
        collapsible: true,
        region: 'east',
        width: 250,
        split: true,
        items: [{
            xtype: 'editorform'
        }]
    }]
});
