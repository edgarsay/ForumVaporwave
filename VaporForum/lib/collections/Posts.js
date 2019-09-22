import { 
    Mongo 
} from 'meteor/mongo';
import{
    Meteor
} from 'meteor/meteor';
import{
    check 
} from 'meteor/check';
import{
    Comments
}from './Comments.js'

//TODO: create a mongo schema
export const Posts = new Mongo.Collection("posts");

/*
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', function postsPublication() {
    return Tasks.find();
  });
}
*/

Meteor.methods({
    'posts.insert'(textv, threadIdv){
        check(textv, String);

        //check if the user's logged in
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized: no logged in');
        }

        Posts.insert({
            text : textv,
            threadId: threadIdv,
            owner : Meteor.userId(),
            ownerUsername : Meteor.user().username,
            createdAt: new Date(),
        });
    },

    'posts.remove'(postv){
        check(postv._id, String);

        //check if the user's logged in
        //if(!Meteor.userId()){
        if(!this.userId){
            throw new Meteor.Error('not-authorized: no logged in');
        }
        //check if the user's the owner of the post
        //if(Meteor.userId() !== postv.owner){
        if(this.userId !== postv.owner){
            throw new Meteor.Error('not-authorized: no the owner');
        }

        Posts.remove(postv._id);
        Comments.remove({postId: postv._id});
    },

})