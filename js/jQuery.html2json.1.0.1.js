/*****************************************************
*													 *
*	Author: Dinesh Vadivel							 *
*	Plugin: jQuery.html2json.1.0.1.js				 *
*	Date:	11-10-2013								 *
*													 *
*													 *
*													 *
*													 *
*													 *
*													 *
*****************************************************/

(function($){
   var Html2json = function(element, options)
   {
       var elem = $(element);
       var obj = this;
       var rand;
       // Merge options with defaults
       var settings = $.extend({
       	  
          selected	: ""
       }, options || {});
       
       var matched, browser;
       jQuery.uaMatch = function( ua ) {
	   ua = ua.toLowerCase();
	   var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

		    return {
		        browser: match[ 1 ] || "",
		        version: match[ 2 ] || "0"
		    };
		};

		matched = jQuery.uaMatch( navigator.userAgent );
		browser = {};
		
		if ( matched.browser ) {
		    browser[ matched.browser ] = true;
		    browser.version = matched.version;
		}
		
		// Chrome is Webkit, but Webkit is also Safari.
		if ( browser.chrome ) {
		    browser.webkit = true;
		} else if ( browser.webkit ) {
		    browser.safari = true;
		}
		
		jQuery.browser = browser;
		
     	Generatejson(elem, settings, matched.browser);

      
       
       
       // Public method
       this.addhighlight = function()
       {
           
       };
   };

   function Generatejson(element, options, browser) 
   {
		ID=element.attr('id');

		$('#'+ID+ '>div').each(function(){
			var root = $('this');
			var className = 'group';
			
			console.log(getDepth(root,className));
			/*if($(this).data('name'))
			{
				console.log($(this).data('name'));
			}
			else {
				
				$(this).children('>div').each(function () {
				    alert(this.value); // "this" is the current element in the loop
				});
			}*/
		});	
   }
		
   function getDepth(root, className) {
	       var children = root.children('.' + className),
	           maxDepth = 0;
	   
	       if (children.length === 0) {
	           return maxDepth;
	       } else {
	           children.each(function() {
	               var depth = 1 + getDepth($(this), className);
	               if (depth > maxDepth) {
	                   maxDepth = depth;
	               }
	           });
	       }
	   
	       return maxDepth;
  }	

  
  
   $.fn.html2json = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('html2json')) return;

           // pass options to plugin constructor
           var html2json= new Html2json(this, options);
          
           // Store plugin object in this element's data
           element.data('html2json', html2json);
       });
   };
})(jQuery);