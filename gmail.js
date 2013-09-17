var Gmail =  {

	user_email : function() {
		var user_email = null;

	  if ($("#gbgs4dn").length == 0) {
	    user_email = $("#gbi4t").text();
	  } else {
	    user_email = $("#gbgs4dn").text();
	  }

	  if(user_email.indexOf('@') == -1) {
	    user_email = $($('.gbps2')[0]).text();
	  }

	  return user_email.replace(/['"]/g, '').trim();
	};


}