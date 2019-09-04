import {
  Template
} from 'meteor/templating';
import {
  Posts
} from '../imports/api/collections.js';
import{
  Accounts
} from 'meteor/accounts-base';


//config accounts:
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
})

import './main.html';

//template.templateName.helpers
Template.body.helpers({
  posts() {
    return Posts.find({})
  }
});

Template.post.events({
  'click .delete-post':function(){
    //padrão
    event.preventDefault();

    //remove from collection
    Posts.remove(this._id);

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
    Posts.insert({
      text : textv,
      //date now
      createdAt: new Date(),
    })

    //clear form 
    target.text.value = "";

    return false;
  }
})