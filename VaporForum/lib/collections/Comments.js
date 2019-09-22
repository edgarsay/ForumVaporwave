import { 
    Mongo 
} from 'meteor/mongo';
import{
    Meteor
} from 'meteor/meteor';
import{
    check 
} from 'meteor/check';

//TODO: create a mongo schema
export const Comments = new Mongo.Collection("comments");

Meteor.methods({
    'comments.insert'(textv, postIdv){
        //validate values
        check(textv, String);
        check(postIdv, String);

        //check if the user's logged in
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized: no logged in');
        }

        //insert in the DB
        Comments.insert({
            textc: textv,
            postId: postIdv,
            owner : Meteor.userId(),
            ownerUsername : Meteor.user().username,
            createdAt: new Date(),
        });
    },
});