var StoryLinkView = require('views/story_link_view');

describe('StoryLinkView', function() {

  beforeEach(function() {
    StoryLinkView.prototype.noteTemplate = sinon.stub().returns('');
    StoryLinkView.prototype.hoverBox = sinon.stub().returns('');

    var $el = $(`<a class="StoryLink"></a>`);
    var Story = Backbone.Model.extend({
      description: '',
      name: 'story',
      url: '/foo',
      views: [{highlight: sinon.stub()}]
    });

    this.story = new Story({id: 2, title: 'StoryTitle', description: ''});
    this.view = new StoryLinkView({model: this.story, el: $el});
  });

  it("has a data-original-title attribute", function() {
    expect(this.view.$el.data('original-title')).toBe(this.story.get('title'));
  });

  it("has a data-content attribute", function() {
    expect(this.view.$el.data('content')).toBe(this.story.get('description'));
  });

  it("highlights its story on click", function() {
    this.view.highlightStory({stopPropagation: sinon.stub()});
    expect(this.story.views[0].highlight).toHaveBeenCalled();
  });

  describe("StoryLink__icon", function() {

    it("should not exist when story's state is unscheduled", function() {
      this.story.set({state: 'unscheduled'});
      expect(this.view.$('.StoryLink__icon').length).toBe(0);
    });

    describe("when state is delivered", function() {

      it("should have two icons", function(){
        this.story.set({state: 'delivered'});
        expect(this.view.$('.StoryLink__icon').length).toBe(2);
      });

    });

    describe("is a material icon", function() {

      it("when state is accepted", function(){
        this.story.set({state: 'accepted'});
        expect( this.view.$('.StoryLink__icon')).toHaveClass('mi');
      });

      it("when state is rejected", function(){
        this.story.set({state: 'rejected'});
        expect(this.view.$('.StoryLink__icon')).toHaveClass('mi');
      });

    });

  });

});
