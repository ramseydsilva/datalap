Ext.define('datalap.view.main.MainController', {
    
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.main',
    
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
