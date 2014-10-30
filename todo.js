
var hideMyDiv = function(id) {
	$(id).hide();
};

var showMyDiv = function(id) {
	$(id).show();
};

var uncheckChkAll = function(id) {
	$(id).prop('checked', false);
};

var checkAllChildChk = function() {
	var obj = document.getElementsByName("chkChild");
	var iLength = obj.length;
	var bFlag = true;

	for (var i = 0; i < iLength; i++) {
		// alert(obj[i].style.display); // $(element).is(":visible") 
		if(!obj[i].checked){
			bFlag = false;
			break;
		}
	}

	if(bFlag) {
		$("#chkSelectAll").prop('checked', true);
	}
};

	$(document).ready(function() {	
	hideMyDiv("#myBody");
	hideMyDiv("#footer");

	// attach kypress event for textbox
	$("#txtMessage").on('keypress',function (event) {		
		if(event.keyCode===13) {
			
			var val = $("#txtMessage").val().trim();

			if(val==="") {
				alert("Please enter what you want to add in list.");
				return false;
			} else {
				//var divContent = '<li class="list-group-item"> <input type="checkbox" class="checkBox" name="chkChild"> <strong>';
				//divContent += val+'</strong> <a href="javascript:void(0);" class="glyphicon glyphicon-remove"></a> </li>';

				// step 1, handlebars.js
				var theData = new Object();
				theData.todoMessage = val;				

				// Retrieve the HTML from the script tag we setup in step 1
				// We use the id (header) of the script tag to target it on the page
				var theTemplateScript = $("#scriptTodo").html();

				// The Handlebars.compile function returns a function to theTemplate variable
				var theTemplate = Handlebars.compile(theTemplateScript);

				$('.list-group').append(theTemplate(theData)); // set new li content 
				$("#txtMessage").val(""); // reset entered text value
				$('input[name$="txtMessage"]').attr('placeholder','What you want to do?'); // set placeholder
				
				showMyDiv("#myBody");
				showMyDiv("#footer");	
			}
		}
    }); // end of keypress event of txtMessage

	$("#chkSelectAll").on('click', function() {
		//console.log($(this).is(':checked'));
		if($(this).is(':checked')) {
			$(".checkBox").prop('checked', true);
			$(".list-group-item").addClass("checked");
		} else {
			$(".checkBox").prop('checked', false);
			$(".list-group-item").removeClass("checked");
		}
	});

	$('#navAll').click(function() {
		$(".active").removeClass("active");
		$('#navAll').addClass("active");

		showMyDiv(".list-group-item");
		checkAllChildChk();
	});

	$('#navCompleted').click(function() {
		$(".active").removeClass("active");
		$('#navCompleted').addClass("active");

		hideMyDiv(".list-group-item");
		showMyDiv(".checked");
		checkAllChildChk();
	});

	$('#navPending').click(function() {
		$(".active").removeClass("active");
		$('#navPending').addClass("active");

		showMyDiv(".list-group-item");
		hideMyDiv(".checked");
		uncheckChkAll("#chkSelectAll");
	});
		
	$('.list-group').on('click', 'input', function(event) {
		if($(event.target).is(':checked')) {				
			$(this).parent().addClass("checked");
			checkAllChildChk();
		} else {				
			$(this).parent().removeClass("checked");
			uncheckChkAll("#chkSelectAll");
		}
	});

	$('.list-group').on('click', 'a', function(event) {
		$(this).parent().remove();
	});

	$('#remove').on('click', function() {
		$('.checked').remove();
		uncheckChkAll("#chkSelectAll");
	});
});