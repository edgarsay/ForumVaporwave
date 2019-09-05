import {
  Template
} from 'meteor/templating';
import {
  Posts
} from '../imports/api/collections.js';
import{
  Accounts
} from 'meteor/accounts-base';
import{
  Meteor 
} from 'meteor/meteor';


//config accounts:
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
})

import './main.html';

//template.templateName.helpers
Template.body.helpers({
  posts() {
    return Posts.find({})
  },
});

Template.post.helpers({
  'myPost':function(idv){
    return Meteor.userId() === idv;
  },
})

Template.post.events({
  'click .delete-post':function(){
    //padrão
    event.preventDefault();

    //remove from collection
    Meteor.call('posts.remove', this);

    return false;
  }
})

Template.add.events({
  'submit .add-post':function(){
    //padrão
    event.preventDefault();

    //pega o valor:
    const target = event.target;
    const textv = target.text.value;

    //insert into collection
    Meteor.call('posts.insert', textv);

    //clear form 
    target.text.value = "";

    return false;
  }
})