import { Mongo } from 'meteor/mongo';
export const Posts = new Mongo.Collection('posts');
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', ()=> {
    return Posts.find();
  });
}
