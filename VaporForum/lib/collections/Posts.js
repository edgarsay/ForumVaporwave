import { 
    Mongo 
} from 'meteor/mongo';
import{
    Meteor
} from 'meteor/meteor';
import{
    check 
} from 'meteor/check';

export const Posts = new Mongo.Collection("posts");

Meteor.methods({
    'posts.insert'(textv){
        check(textv, String);

        //check if the user's logged in
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized: no logged in');
        }

        Posts.insert({
        text : textv,
        owner : Meteor.userId(),
        ownerUsername : Meteor.user().username,
        //date now
        createdAt: new Date(),
        });
    },

    'posts.remove'(postv){
        check(postv._id, String);

        //check if the user's logged in
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized: no logged in');
        }
        //check if the user's the owner of the post
        if(Meteor.userId() !== postv.owner){
            throw new Meteor.Error('not-authorized: no the owner');
        }

        Posts.remove(postv._id);
        Coments.remove({postId: postv._id});
    },

})