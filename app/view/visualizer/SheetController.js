var selectedCell,
    X = [],
    Y = [];

Ext.define('datalap.view.visualizer.SheetController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.visualizer',
    
    visualize: function() {
        var items = [],
            that = this,
            dict = {},
            fields = ['rows'],
            columns = [{ text: '', dataIndex: 'rows' }],
            gotRecords = 0,
            xRecords = [],
            yRecords = [],
            processedRecords = false,
            gridStore,
            processRecords = function() {
                processedRecords = true;                
                xRecords.forEach(function(xChildren, xIndex) {
                    yRecords.forEach(function(yChildren, yIndex) {
                        xChildren.forEach(function(xChild) {
                            yChildren.forEach(function(yChild) {
                                if (xChild.get("_id") == yChild.get("_id")) {
                                    var row = gridStore.findRecord("rows", xChildren.row.get("name"));
                                    row.set(yChildren.col.get("name"), xChild.get("name"));
                                    if (!dict[xChildren.row.get("_id")]) {
                                        dict[xChildren.row.get("_id")] = {};
                                    }
                                    dict[xChildren.row.get("_id")][yChildren.col.get("_id")] = xChild;
                                }
                            });
                        });
                    });
                });
            };

        var yCnt = 1;
        Y.forEach(function(child) {
            
            fields.push(child.data.name);
            columns.push({text: child.data.name, dataIndex: child.data.name, editor: 'textfield', xNodeId: child.data._id });
            
            that.store.load({node: child, onChildNodesAvailable: function(records, recursive, callback, scope) {
                child.set('expanded', true);
                child.set('expanded', false);
            }, callback: function(records) {
                records.col = child;
                yRecords[yCnt-1] = records;
                if (xCnt == X.length + 1 && yCnt == Y.length && !processedRecords) {
                    processRecords();
                }
                yCnt ++;
            }});
        });
        
        var xCnt = 1;
        X.forEach(function(child) {
            var row = { 'rows': child.data.name };
            Y.forEach(function(child) {
                row[child.data.name] = ''; // to be filled if contains value
            });
            row.yNodeId = child.data._id;
            items.push(row);

            that.store.load({node: child, onChildNodesAvailable: function(records, recursive, callback, scope) {
                child.set('expanded', true);
                child.set('expanded', false);
            }, callback: function(records) {
                records.row = child;
                xRecords[xCnt-1] = records;
                if (xCnt == X.length && yCnt == Y.length + 1 && !processedRecords) {
                    processRecords();
                }
                xCnt ++;
            }});
        });

        gridStore = Ext.create('Ext.data.Store', {
            fields: fields,
            data:{'items': items},
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'items'
                }
            }
        });
        
        var grid = Ext.create('Ext.grid.Panel', {
            store: gridStore,
            columns: columns,
            selModel: 'cellmodel',
            requires: [
                'Ext.grid.plugin.DragDrop'
            ],
            
            plugins: [{
                ptype: 'cellediting',
                clicksToEdit: 2
            }],
            
            viewConfig: {plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'treegrid',
                dropGroup: 'treegrid'
            }},
            
            listeners: {
                edit: function(editor, context, eOpts) {
                    var x = context.record.data.yNodeId;
                    var y = context.column.xNodeId;
                    
                    if (dict[x] && dict[x][y]) {
                        var node = dict[x][y];
                        if (node.get("name") != context.value) {
                            node.set("name", context.value);
                            node.save();
                        }
                    } else if (context.value) {
                        
                        var childNode = Ext.create("datalap.model.Node", {
                            name: context.value,
                            leaf: true,
                            parents: [x, y]
                        });
                        childNode.save({
                            success: function(n) {
                                n.set("_id", newId);
                                if (!dict[x]) {
                                    dict[x] = {};
                                }
                                dict[x][y] = n;
                                X.appendChild(n);
                                Y.appendChild(n);
                            }
                        });
                    }
                    // store.filter to edit existing node
                },
                cellclick: function(that, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    var x = record.data.yNodeId;
                    var y = that.getHeaderByCell(td).xNodeId;
                    
                    if (dict[x] && dict[x][y]) {
                        selectedCell = dict[x][y];
                        Ext.global.editorform.loadRecord(selectedCell);
                    }
                },
                viewready: function(that, eOpts) {
                    that.view.on("beforedrop", function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
                        dropHandlers.cancelDrop();
                        var dragged = tree.getEl(node);
                        if (overModel && dragged) {
                            var parents = [];
                            parents = parents.concat(dragged.get("parents"));
                            var newParentId = overModel.get("_id");
                            if (parents.indexOf(newParentId) == -1) {
                                parents.push(newParentId);
                                dragged.set("parents", parents);
                                dragged.save();
                            }
                            Ext.global.editorform.loadRecord(dragged);
                        }
                    });
                }
            }
        });
        
        var sheet = Ext.getCmp("sheet");
        sheet.removeAll();
        sheet.add(grid);
    },
    
    init: function() {
        this.store = Ext.getStore("Node");
    }
    
});