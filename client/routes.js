Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function () {

  this.route('piles', {
    path: '/',
    template: 'pilesView',
    data: function () {
      return Piles.find({});
    },
  });

  this.route('pile', {
    path: '/p/:_id',
    template: 'pileView',
    data: function () {
      _id = this.params._id;
      var pile = Piles.findOne({
        _id: this.params._id
      });
      return {
        pile: pile
      };
    },
  });
});