import {
  Template
} from 'meteor/templating';
import{
  Accounts
} from 'meteor/accounts-base';
import{
  Meteor 
} from 'meteor/meteor';
import {
  Threads, currentThreadName
} from '../lib/collections/Threads.js';
import { ReactiveDict } from 'meteor/reactive-dict';

//config accounts:
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
})

import './post/post.js';
import './thread/thread.js'
import './main.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

//template.templateName.helpers
Template.body.helpers({
  currentThread(){
    const instance = Template.instance();
    let currentThreadName = instance.state.get('currentThreadName');
    if(currentThreadName)
      return Threads.find({name: currentThreadName});
    return Threads.find({name: "global"})
  },
  threads(){
    return Threads.find({});
  }
});


//template.templateName.events
Template.newThread.events({
  'submit .add-thread':function() {
    //padrão
    event.preventDefault();

    //pega o valor:
    const target = event.target;
    const namev = target.name.value;

    //insert into collection
    Meteor.call('threads.insert', namev);

    //clear form 
    target.name.value = "";

    instance.state.set('currentThreadName', namev);
    return false;
  }
})

Template.body.events({
  'click .select-thread':function(event, instance){
    event.preventDefault();
    instance.state.set('currentThreadName', this.name);
    return false;
  }
})
