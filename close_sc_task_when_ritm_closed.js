var grTask = new GlideRecord('sc_task');
grTask.addEncodedQuery('active=true^request_item.active=false^stateIN1,2^request_item.stateIN3,4,5');
grTask.setLimit(1);
grTask.query();

while(grTask.next()){
  gs.print(grTask.number + ' ' +
          grTask.state.getDisplayValue() + ' ' +
          grTask.active + ' ' +
          grTask.request_item.getDisplayValue() + ' ' +
          grTask.getElement('request_item.state').getDisplayValue() + ' ' +
          grTask.getElement('request_item.active')
        );

  grTask.autoSysFields(false);
  grTask.setWorkflow(false);

  grTask.state = grTask.getElement('request_item.state');
  grTask.active = false;
  grTask.update();
}
