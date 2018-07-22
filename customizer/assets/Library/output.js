jq(document).ready(function() {
	/*
	 Output file creating event code.
	 */
 var onclickEvent=false;
  jq('body').on(eventType,'.submit-button input',function(){
	 	 if(validateRecord()==true){
	 	 		var formElement = document.getElementById("getInfo");
	 	 		var fd = new FormData(formElement);
	 	    jq.ajax({
	 		type:'post',
	 		url:'assets/PHP/storeInfo.php',
	 		data:fd,
	 		 processData: false,
          contentType: false,
	 		success:function(responseData){
	 			onclickEvent=true;
	 			alert('submitted');
	 			jq('body').find('input[type="text"]').val(' ');
	 				jq('body').find('input[type="email"]').val(' ');
	 			jq('body').find('input[type="checkbox"]').prop('checked',false);
	 			jq('body').find('input[type="radio"]').prop('checked',false);
	 		},
	 		error:function(err){
	 			
	 		}
	 	})
	 	}
	 });
	jq('body').on(eventType, '#outputGen a', function(e) {
	
		//if(onclickEvent==true || jq(this).attr('alt')=='png'){
			 jq('.inneroverlay').show();
		e.preventDefault()
		var index = jq(this).attr('alt');
		var path = 'assets/PHP/output.php?format=' + index;
		jq.ajax({
			url : path,
			type : 'POST',
			async : false,
			success : function(data) {
				jq('.inneroverlay').hide();
				str = data.split("&&&&");
				if (str[1] == 1)
					window.open(str[0]);
				//else
					//alert(str[0]);
			}
		});
		//}
	});

	opc_Change_Lang = function(l) {
		language = l;
		jQuery.ajax({
			url : opc_get_lang,
			type : 'post',
			data : 'lang=' + l,
			success : function(responseText) {
				dict = JSON.parse(responseText);
				var translator = jQuery('body').translate({
					lang : l,
					t : dict
				});
			}
		});
	}
	opc_renderViews();
	opc_Change_Lang(opc_lang);
	
	

});
opc_renderViews = function() {
	var body_td = '';
	var head_td = '';
	jq.each(JSON.parse(opc_viewName).viewsName, function(key, val) {
		head_td += '<td class"trn" width="210">' + val + '</td>';
	});
	jq.each(JSON.parse(opc_views).pngOutputArr, function(key, val) {
		body_td += '<td ><img src="' + val + '" alt="" /></td>';
	});
	jq('.tablebody').prepend(body_td);
	jq('.tablehead').prepend(head_td);
}
	validateRecord=function(){
		jq('body').find('.err').remove();
		jq('body').removeClass('invalidFormat');
	var name = /^[a-zA-Z]/;
     var email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
     var bool=true;
    // alert(jq('#radio03').prop('checked'))
     if(!(name.test(jq('#name').val()))){
	 	 if(!(jq('#name').hasClass('invalidFormat')))
	 	 jq('#name').addClass('invalidFormat')
	 	bool=false;
	 }
	 if(!(email.test(jq('#email').val()))){
		 if(!(jq('#email').hasClass('invalidFormat')))
	 	jq('#email').addClass('invalidFormat');
	 	bool=false;
	 }
	 if(jq('#radio01').prop('checked')==true){
	 	if(jq('#describe').val().length==0 || jq('#describe').val()==''|| jq('#describe').val()==undefined){
	 		jq('#describe').addClass('invalidFormat')
	 		bool=false;
	 	} 
	 }else{
	 	if(jq('#radio02').prop('checked')==false){
	 		bool=false;
	 	}else{
	 		jq('#describe').val(' ')
	 	}
	 }
	 if(jq('#radio03').prop('checked')==false && jq('#radio04').prop('checked')==false && jq('#radio05').prop('checked')==false){
	 	jq('#radio03').parents('.form-group').append('<span class="err"style="color:red">Select Any One</span>');
	 	bool=false;
	 }
	  if(jq('#test1').prop('checked')==false && jq('#test2').prop('checked')==false && jq('#test3').prop('checked')==false && jq('#test4').prop('checked')==false && jq('#test5').prop('checked')==false ){
	  	jq('#test1').parents('.form-group').append('<span class="err" style="color:red">Select Any One</span>');
	  	bool=false;
	  }
	  if(jq('#radio01').prop('checked')==false && jq('#radio02').prop('checked')==false){
	  	jq('#radio01').parents('.form-group').append('<span class="err"style="color:red">Select Any One</span>');
	  }
	 return bool;
	}
