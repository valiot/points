import './libs';
import ProjectsIndexController from './controllers/projects/IndexController';
import TagGroupsIndexController from './controllers/tag_groups/IndexController';
import { start as ProjectsShowController } from './central'

const routes = {
  'projects.index': ProjectsIndexController,
  'projects.show': ProjectsShowController,
  'tag_groups.new': TagGroupsIndexController
};

const page = $('body').data('page');

if(routes[page]) {
  $(routes[page]);
}
