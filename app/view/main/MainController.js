/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('datalap.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.main',

    initialize: function() {
        this.getView('tree').create();    
    },
    
    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure you want to logout?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            localStorage.removeItem("loggedIn");
            this.getView().destroy();
            Ext.widget("login");
        }
    }
});
