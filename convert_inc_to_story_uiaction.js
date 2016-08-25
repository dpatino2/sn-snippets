function openFormDialog(){
    var sysId;
    if (typeof rowSysId == 'undefined')
        sysId = gel('sys_uniqueValue').value;
    else
        sysId = rowSysId;
	Utility.getInstance().showBackground(document.body, 999, "");
    var values = {};
    values["type"] = "Development";
    values["short_description"] = g_form.getValue("short_description");
    values["description"] = g_form.getValue("description");
    values["assigned_to"] = g_form.getValue("assigned_to");
	values["watch_list"] = g_form.getValue("caller_id") + ',' + g_user.userID;
    values["classification"] = "Defect";
	new FormDialogDefinition(null, "rm_story", $("incident.form_scroll"), "scrum", "true").setAfterCloseCallback(function(action_verb, sys_id, updated_table, display_value){

		g_form.setValue('u_scrum_story',sys_id);

		var gr = new GlideRecord("rm_story");
		gr.addQuery("sys_id", sys_id);
		gr.query();
		if (gr.next()){
			gr.parent = sysId;
			gr.update(function(){
				gsftSubmit(null, g_form.getFormElement(), 'create_scrum_story');
				Utility.getInstance().hideBackground("");
				if (GlideList2.get("rm_enhancement.rm_story.enhancement"))
					GlideList2.get("rm_enhancement.rm_story.enhancement").refresh();

			});
		} else {
			Utility.getInstance().hideBackground("");
			if (GlideList2.get("rm_enhancement.rm_story.enhancement"))
				GlideList2.get("rm_enhancement.rm_story.enhancement").refresh();
		}


	}).setCloseCallback(function(){
		Utility.getInstance().hideBackground("");
	}).open(null, "rm_story", sysId, values);

}

if(typeof window == 'undefined')
   serverFinish();


function serverFinish(){
	gs.addInfoMessage('serverFinish start');
	var stryParent = '';

	var grStory = new GlideRecord("rm_story");
	grStory.addQuery("parent", current.sys_id);
	grStory.query();
	if (grStory.next()) {
		stryParent = grStory.sys_id;
		grStory.parent = '';
		grStory.update();
	}

	//current.state = 'Awaiting Release';
	current.u_scrum_story = stryParent;
	current.comments = "Incident " + current.number +  " has been converted to Story " + grStory.number + " and transitioned to the development team.";
	current.update();

}
