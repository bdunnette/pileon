Piles.allow({
insert: function (userId, doc) {
return (userId);
},
update: function (userId, doc) {
return (userId);
},
remove: function (userId, doc) {
return (userId);
}
});


Meteor.publish("piles", function () {
  return Piles.find({});
});

Meteor.startup(function () {
  // code to run on server at startup
});
