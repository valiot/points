class IntegrationWorker
  include Sidekiq::Worker
  include Central::Support::MattermostHelper
  include Central::Support::SlackHelper

  def perform(project_id, message)
    project = Project.find(project_id)
    project.integrations.
      each   { |integration|
        case integration.kind
        when 'mattermost'
          send_mattermost(integration, message)
        when 'slack'
          send_slack(integration, message)
        end
      }
  end
end
