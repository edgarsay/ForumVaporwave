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
export const Coments = new Mongo.Collection("coments");

Meteor.methods({
    //!Methods of posts collection
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

    //!Methods of coments collection
    'coments.insert'(textv, postIdv){
        check(textv, String);
        check(postIdv, String);

        //check if the user's logged in
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized: no logged in');
        }
        Coments.insert({
            textc: textv,
            postId: postIdv,
            owner : Meteor.userId(),
            ownerUsername : Meteor.user().username,
            createdAt: new Date(),
        });
    },

})