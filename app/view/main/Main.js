Ext.define('datalap.view.main.Main', {
    
    extend: 'Ext.container.Container',
    
    requires: [
        'datalap.view.main.MainController',
        'datalap.view.browser.Tree',
        'datalap.view.editor.Editor',
        'datalap.view.visualizer.Sheet'
    ],

    plugins: 'viewport',
    xtype: 'app-main',
    
    controller: 'main',

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
        width: 300,
        items:[{
            region: 'north',
            xtype: 'tree'
        }]
    }, {
        xtype: 'panel',
        title: 'Visualizer',
        region: 'east',
        collapsible: true,
        width: 450,
        split: true,
        items: [{
            xtype: 'visualizer',
            itemId: 'visualizer'
        }]
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
