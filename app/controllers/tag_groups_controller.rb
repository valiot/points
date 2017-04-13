class TagGroupsController < ApplicationController
  skip_after_filter :verify_policy_scoped, only: :index

  # GET /projects
  def index
    @tag_groups = current_team.tag_groups
    authorize @tag_groups
  end

  # GET /tag_groups/new
  def new
    @tag_group = TagGroup.new
    authorize @tag_group

    respond_to do |format|
      format.html # new.html.erb
    end
  end

  # POST /projects
  def create
    @tag_group = current_team.tag_groups.new(allowed_params)
    authorize @tag_group

    if @tag_group.save
      redirect_to tag_groups_path
    else
      render :edit
    end
  end

  def allowed_params
    params.require(:tag_group).permit(:name, :description, :bg_color)
  end
end
