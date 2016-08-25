var gr = new GlideRecord("incident");
gr.addQuery('sys_updated_on', '>=', '2016-05-30 00:00:00');
gr.addQuery('sys_updated_on', '>', '2016-06-03 08:00:00').addOrCondition('sys_updated_on', '<', '2016-06-03 00:00:01');
gr.addQuery("state", 'IN', '4,5' );
gr.setLimit(10);
gr.orderBy('sys_updated_on');
gr.query();
while( gr.next() ){
	new GlideHistorySet("incident", gr.sys_id).generate();
	gs.print('DEBUG >> ' + gr.number);
}



var grLog = new GlideRecord("sys_history_line");
grLog.addQuery("label", "State");
grLog.addQuery('new_value','4');
grLog.addQuery('set.table','incident');
grLog.addQuery('update_time', '>=', '2016-05-30 00:00:00');
grLog.orderBy('update_time');
grLog.setLimit(5000);
grLog.query();

while(grLog.next()) {

	var grINC = new GlideRecord("incident");
	grINC.addQuery("sys_id", grLog.getElement('set.id'));
	grINC.query();
	if (grINC.next()) {
		grINC.resolved_at = grLog.update_time;
		grINC.update();
		//gs.log('SUCCESS >> Number - Date: ' + grINC.number + ' - ' + grLog.update_time);
	} else {
		gs.log('ERROR >> INC.SYSID: ' + grLog.getElement('set.id'));
	}

}
