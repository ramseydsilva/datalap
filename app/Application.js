/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('datalap.Application', {
    extend: 'Ext.app.Application',
    
    name: 'datalap',

    stores: [
        // TODO: add global / shared stores here
    ],

    requires: [
        'datalap.model.Node'
    ],
    
    views: [
        'datalap.view.tree.Tree',
        'datalap.view.login.Login',
        'datalap.view.main.Main'
    ],
    
    models: [
        'datalap.model.Node'
    ],
    
    launch: function () {

        // Check whether the browser supports LocalStorage
        // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var supportsLocalStorage = Ext.supports.LocalStorage, 
            loggedIn;

        if (!supportsLocalStorage) {

            // Alert the user if the browser does not support localStorage
            Ext.Msg.alert('Your Browser Does Not Support Local Storage');
            return;
        }

        // Check to see the current value of the localStorage key
        loggedIn = localStorage.getItem("loggedIn");

        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view        
        Ext.widget(loggedIn ? 'app-main' : 'login');

    }
    
});
