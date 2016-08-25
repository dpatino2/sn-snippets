Short Description: ${sysapproval.short_description}
<mail_script>

//find relevant information for RITM
if (current.sysapproval.sys_class_name == "sc_req_item" ) {

	template.print("Summary of Requested items:\n");
	var item = new GlideRecord("sc_req_item");
	item.addQuery("sys_id", current.sysapproval);
	item.query();

	while(item.next()) {
		template.print(item.number + ":  " + item.quantity + " X " + item.cat_item.getDisplayValue() + "\n");
		template.print("    Options:\n");
		var keys = new Array();
		var set = new GlideappVariablePoolQuestionSet();
		set.setRequestID(item.sys_id);
		set.load();
		var vs = set.getFlatQuestions();
		for (var i=0; i < vs.size(); i++) {
			if(vs.get(i).getLabel() != '' && vs.get(i).getLabel() != null && vs.get(i).getDisplayValue() != '') {
			   template.space(4);
			   template.print('     ' +  vs.get(i).getLabel() + " = " + vs.get(i).getDisplayValue() + "\n");
			}
		}
	}

}

//find relevant information for REQ
  if (current.sysapproval.sys_class_name == "sc_request" ) {
	template.print("Summary of Requested items:\n");
	var item = new GlideRecord("sc_req_item");
	item.addQuery("request", current.sysapproval);
	item.query();

	while(item.next()) {
		template.print(item.number + ":  " + item.quantity + " X " + item.cat_item.getDisplayValue() + "\n");
		template.print("    Options:\n");
		var keys = new Array();
		var set = new GlideappVariablePoolQuestionSet();
		set.setRequestID(item.sys_id);
		set.load();
		var vs = set.getFlatQuestions();
		for (var i=0; i < vs.size(); i++) {
			if(vs.get(i).getLabel() != '' && vs.get(i).getLabel() != null && vs.get(i).getDisplayValue() != '') {
			   template.space(4);
			   template.print('     ' +  vs.get(i).getLabel() + " = " + vs.get(i).getDisplayValue() + "\n");
			}
		}
	}
}

//find relevant information for Change Request
if (current.sysapproval.sys_class_name == "change_request" ) {
	template.print('Priority: ' + current.sysapproval.priority.getDisplayValue());
	template.print('\nType: ' + current.sysapproval.type.getDisplayValue());
	template.print('\nChange Owning Group: ' + current.sysapproval.assignment_group.getDisplayValue());
	template.print('\nChange Owner: ' + current.sysapproval.assigned_to.getDisplayValue());

	if(current.sysapproval.approval == 'approved'){
		template.print('\n\n*** This is the CAB approval.  Unless this is an Emergency Change, please wait for the normal CAB meeting before approving. ***')
	}
}

</mail_script>

<hr/>
Comments:
${sysapproval.description}
<hr/>
${mailto:mailto.approval}
<hr/>
${mailto:mailto.rejection}
<hr/>
Click here to view Approval Request: ${URI}
Click here to view ${sysapproval.sys_class_name}:  ${sysapproval.URI}
