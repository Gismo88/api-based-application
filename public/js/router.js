// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      'create': 'create',
      
      // Default - catch all
      '*actions': 'defaultAction'
    },
    
    instance: null
    
  });

  
  var initialize = function ( options ) {
	  
    var appView = options.appView;
    
    var router = new AppRouter(options);
    
    router.on('route:create', function () {
        require(['views/create'], function (CreateView) {
          console.log( "router::create" );
        	
          var createView = Vm.create(appView, 'CreateView', CreateView);
          createView.render();
        });
    });
    
    router.on('route:defaultAction', function (actions) {
      require(['views/index'], function (IndexView) {
        console.log( "router::defaultAction" );
        
        var indexView = Vm.create(appView, 'IndexView', IndexView);
        // indexView.render();
      });
    });
    
    AppRouter.instance = router;
    
    Backbone.history.start();
    
  };
  
  return {
    initialize: initialize,
    AppRouter: AppRouter
  };
});
