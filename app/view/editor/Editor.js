Ext.define('datalap.view.editor.Editor', {
    
    extend: 'Ext.form.Panel',
    model: 'datalap.model.Node',
    alias: 'widget.editorform',

    margin: 10,
    width: '100%',
    
    defaults: {
        padding: 5
    },
    
    layout: {
        type: 'vbox',
        align: 'stretch'
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
        
    }, {
        title: 'Parents',
        alias: 'parentspanel',
        width: '100%',
        listeners: {
            click: {
                element: 'td',
                fn: function() {
                    console.log("clicked");
                }
            }
        }
    }],
    
    initComponent: function() {
        Ext.global.editorform = this;
        this.callParent();
        var oriLoadRecord = this.loadRecord;
        this.loadRecord = function() {
            oriLoadRecord.apply(this, arguments);
            this.renderParents(arguments[0]);
        }
    },
    
    renderParents: function(record) {
        if (!this.store) {
            this.store = Ext.getStore("Node");
        }
        var that = this;
        var parentsPanel = this.items.items[1];
        var html = '<table style="width: 100%">';
        record.data.parents.forEach(function(pid) {
            var parentNode = that.store.getById(pid);
            if (parentNode) {
                html += "<tr><td>" + parentNode.get("name") + "</td><td class='remove' rel='" + parentNode.get("_id") + "' style='text-align: right'>Remove</td></tr>";
            }
        });
        html += "</table";
        parentsPanel.update(html);
        parentsPanel.getEl(".remove").on("click", function(a, clicked, b) {
            var parentId = clicked.getAttribute("rel");
            if (record && parentId) {
                var parents = [];
                parents = parents.concat(record.get("parents"));
                var index = parents.indexOf(parentId);
                if (index != -1) {
                    parents.splice(index, 1);
                    record.set("parents", parents);
                    record.save();
                }
                Ext.global.editorform.loadRecord(record);
            }
        });
    }
    
});