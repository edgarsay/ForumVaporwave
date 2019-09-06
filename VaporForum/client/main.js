import {
  Template
} from 'meteor/templating';
import {
  Posts
} from '../lib/collections/Posts.js';
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

import './post/post.js';
import './main.html';

//template.templateName.helpers
Template.body.helpers({
  posts() {
    return Posts.find({});
  },
});



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