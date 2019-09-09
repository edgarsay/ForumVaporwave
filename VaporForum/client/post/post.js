//TEMPLATE:
import './post.html'
import { Comments } from "../../lib/collections/Comments.js";

Template.post.helpers({
  myPost(idv){
    return Meteor.userId() === idv;
  },

  myComments(){
    let id = this._id;
    return Comments.find({postId: id});
  },
  
})

Template.post.events({
  'click .delete-post':function(){
    //padrão
    event.preventDefault();

    //remove from collection
    Meteor.call('posts.remove', this);

    return false;
  },
  'submit .add-comment':function(){
    //padrão
    event.preventDefault();

    //pega o valor:
    const target = event.target;
    const textv = target.text.value;

    //insert into collection
    Meteor.call('comments.insert', textv, this._id);

    //clear form 
    target.text.value = "";

    return false;
  },
})