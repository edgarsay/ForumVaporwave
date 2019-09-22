import { Meteor } from 'meteor/meteor';
import { Posts } from '../lib/collections/Posts.js'
import { Comments } from '../lib/collections/Comments.js'
import { Threads, currentThreadName } from '../lib/collections/Threads.js'

Meteor.startup(() => {
  // code to run on server at startup
});
