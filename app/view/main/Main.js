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
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        region: 'west',
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        tbar: [{
            text: 'Logout',
            handler: 'onClickButton'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            
            region: 'north',
            xtype: 'maintree'
            
        }]
    }]
});
