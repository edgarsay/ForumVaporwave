//TEMPLATE:
import './thread.html'
import '../post/post.js'
import { Posts } from '../../lib/collections/Posts.js';
import { Meteor } from 'meteor/meteor';

Template.thread.helpers({
  //show only the post of the current thread
  myPosts(){
    let id = this._id;
    return Posts.find({threadId: id});
  },
  isMyThread(idv){
    return Meteor.userId() === idv;
  }
})

Template.thread.events({
  //Add a new post
  'submit .add-post':function(){
    event.preventDefault();

    //get valor for the form
    const target = event.target;
    const textv = target.text.value;

    //insert into collection
    Meteor.call('posts.insert', textv, this._id);

    //clear form 
    target.text.value = "";

    return false;
  },

  'click .delete-thread':function(){
    event.preventDefault();

    Meteor.call('threads.remove',this);

    return false;
  }
})