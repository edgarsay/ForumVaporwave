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
    Posts
} from './Posts';
import{
    Comments
} from './Comments.js';

//TODO: create a mongo schema
export const Threads = new Mongo.Collection("threads");
export let currentThreadName = "global";

/*
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('threads', function threadsPublication() {
    return Threads.find();
  });
}
*/


Meteor.methods({
    'threads.insert'(namev){
        check(namev, String);

        //check if the user's logged in
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized: no logged in');
        }

        Threads.insert({
            name : namev,
            owner : Meteor.userId(),
            ownerUsername : Meteor.user().username,
            createdAt: new Date(),
        });
    },

    'threads.remove'(threadv){
        check(threadv._id, String);

        //check if the user's logged in
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized: no logged in');
        }

        //check if the user's the owner of the post
        if(Meteor.userId() !== threadv.owner){
            throw new Meteor.Error('not-authorized: no the owner');
        }
        
        //delete posts of the deleted thread
        const posts = Posts.find({threadId: threadv._id});
        for( post of posts){
            Comments.remove({postId: post._id});
            Posts.remove(post._id);
        }

        //delete thread
        Threads.remove(threadv._id);
    },
    
})