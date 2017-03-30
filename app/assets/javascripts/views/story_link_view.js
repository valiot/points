module.exports = Backbone.View.extend({
  hoverBox: require('templates/story_hover.ejs'),
  template: require('templates/story_link.ejs'),
  noteTemplate: require('templates/note.ejs'),

  events: {
    'click': 'highlightStory'
  },

  icons: {
    accepted: 'check_circle',
    rejected: 'cancel'
  },

  initialize: function() {
    this.$el.addClass('popover-activate');
    this.$el.attr({
      'id': `story-link-${this.model.id}`,
      'data-content': this.hoverBox({story: this.model, noteTemplate: this.noteTemplate}),
      'data-original-title': this.model.get('title'),
      'href': `#story-${this.model.id}`
    });

    this.listenTo(this.model, 'change:state', this.render);
    this.listenTo(this.model, 'change:title', this.render);
    this.listenTo(this.model, 'change:description', this.render);
  },

  render: function() {
    const state = this.model.get('state');

    this.$el.html(this.template({
      content: `#${this.model.id}`,
      icon: this.getIcon(state),
      state: state
    }));

    return this;
  },

  getIcon: function(state) {
    return this.icons.hasOwnProperty(state) && this.icons[state];
  },

  highlightStory: function(ev) {
    _.each(this.model.views, (view) => view.highlight());
    ev.stopPropagation();
  }
});
