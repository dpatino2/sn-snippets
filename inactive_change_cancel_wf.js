var grCTask = new GlideRecord('change_task');
grCTask.addEncodedQuery('change_request.active=false^state!=4^ORstate=NULL^state!=3^ORstate=NULL^state!=5^ORstate=NULL');
grCTask.setLimit(1);
grCTask.query();

while(grCTask.next()){

gs.log('DEBUG >> Task Number: ' + grCTask.number);

var grChange = new GlideRecord('change_request');
grChange.get(grCTask.change_request);

gs.log('DEBUG >> Change Number: ' + grChange.number);

(new Workflow()).cancel(grChange);

}
