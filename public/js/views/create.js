define([
  'jquery',
  'backbone',
  'models/link',
  'router',
  'text!templates/create/index.html'
], function($, Backbone, LinkModel, Router, indexTemplate){
	
  var CreateController = Backbone.View.extend({
    
	el: '.content',
	
	model: new LinkModel(),
    
	events: {
		'submit form': 'submitLink'
	},
    
    initialize: function() {
    	console.log( "controllers/CreateController::initialize()" );
    },
    
    render: function () {
    	console.log( "controllers/CreateController::render()" );
    	console.log( indexTemplate );
    	
    	this.$el.html ( indexTemplate );
    },
    
    submitLink: function (ev) {
    	ev.preventDefault();
    	
    	var form = ev.currentTarget;
    	var params = {};
    	
    	$( form ).find('input.text').each(function(){
    		params[ $(this).attr('name') ] = $(this).val();
    	});
    	
    	console.log( params );
  
    	this.model.save( params, {
    		success: function () {
    			console.log( "submitted" );
    			
    			$(form).find("input.text").val( '' );
    			$(form).hide();
    			$('#thankYou').show();
    		}
    	});
    	
    	return false;
    }
    
  });
  
  return CreateController;
  
});
