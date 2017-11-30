
jQuery.fn.is_exist = function(){return this.length>0;}

function contentCenter($content){
  var content = $($content),
  half = content.outerHeight() / 2,
  calc = "calc(50% - "+half+"px)";
  content.css({
    top: calc
  });
}

function pageRedirect() {
  window.location.href = "/challenges";
        //window.location.replace("/index1.html");
}      

$( "#submit" ).click(function(){
 var enteredVal = $('#marshall-email').val();
 console.log(enteredVal);
 is_email=false;
 if(enteredVal == 'security@coc.in'){
		is_email = true;
	}
	if(is_email){
		 setTimeout("pageRedirect()", 1000);
	}
  else{
$("#error").show();
  }
});



$(function() {
	if ( $('.jquery-center').is_exist() ) {
  contentCenter('.jquery-center');
}
});


$(window).on("load", function(){
$(".marshall-loading-screen").delay(200).fadeOut('slow');
$("#error").hide();
if ( $('.jquery-center').is_exist() ) {
  contentCenter('.jquery-center');
}
});

setTimeout(function() {
  $('#hint').fadeOut('slow');
}, 3000); 

$(window).on("resize", function(){
  if ( $('.jquery-center').is_exist() ) {
    contentCenter('.jquery-center');
  }
});