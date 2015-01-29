Ext.define('datalap.view.main.Editor', {
    
    extend: 'Ext.form.Panel',
    model: 'datalap.model.Node',
    alias: 'widget.editorform',
    layout: 'column',
    margin: 10,
    width: '100%',
    
    defaults: {
        padding: 5
    },
    
    items : [{

        xtype: 'fieldcontainer',
        labelWidth: 75,
        defaultType: 'textfield',

        // Arrange fields vertically, stretched to full width
        layout: 'anchor',
        defaults: {
            layout: '100%'
        },

        // These config values will be applied to both sub-fields, except
        // for Last Name which will use its own msgTarget.
        fieldDefaults: {
            msgTarget: 'under',
            labelAlign: 'top',
            width: '95%'
        },
        
        items: [{
            xtype: 'textfield',
            fieldLabel: 'ID',
            name: '_id'
        }, {
            xtype: 'textfield',         
            fieldLabel: 'Name',
            name: 'name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Value',
            name: 'value'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Calc',
            name: 'calc'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Type',
            name: 'type'
        }, {
            xtype: 'textareafield',
            fieldLabel: 'Parents',
            name: 'parents'
        }, {
            xtype: 'textareafield',
            fieldLabel: 'Children',
            name: 'oriChildren'
        }, {
            xtype: 'textareafield',
            fieldLabel: 'Attributes',
            name: 'attrs'
        }]
        
    }],
    
    initComponent: function() {
        Ext.global.editorform = this;
        this.callParent();
    }
    
});