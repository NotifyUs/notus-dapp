import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-bulma-switch'
import classnames from 'classnames'
import { Plus } from 'react-feather'
import { Link } from 'react-router-dom'

import { PublishButton } from '~/components/events/PublishButton'
import { WebhookUrlInput } from '~/components/forms/WebhookUrlInput'
import { WebhookBodyInput } from '~/components/forms/WebhookBodyInput'
import { WebhookHeaderForm } from '~/components/forms/WebhookHeaderForm'
import * as routes from '~/../config/routes'

export const EventAction =
  class _EventAction extends PureComponent {
    static propTypes = {
      event: PropTypes.object.isRequired,
      webhookUrl: PropTypes.string,
      webhookBody: PropTypes.string,
      sendEmail: PropTypes.bool,
      callWebhook: PropTypes.bool,
      onChangeSendEmail: PropTypes.func.isRequired,
      onChangeWebhookUrl: PropTypes.func.isRequired,
      onChangeWebhookBody: PropTypes.func.isRequired,
      onChangeCallWebhook: PropTypes.func.isRequired,
      onChangeWebhookHeader: PropTypes.func.isRequired,
      onAddWebhookHeader: PropTypes.func.isRequired,
      onDeleteWebhookHeader: PropTypes.func.isRequired,
      currentUserData: PropTypes.object
    }

    toggleWebhookForm = () => {
      this.props.onChangeCallWebhook(!this.props.callWebhook)
    }

    onChangeSendEmail = () => {
      this.props.onChangeSendEmail(!this.props.sendEmail)
    }

    render () {
      const { currentUserData } = this.props
      const email = currentUserData?.currentUser?.email || ''
      const emailOrMessage = currentUserData?.currentUser?.confirmedAt ?
        email :
        `Check your '${email}' inbox to confirm email address first`

      return (
        <>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <PublishButton
                  event={this.props.event}
                  handleTogglePublish={this.props.handleTogglePublish}
                />
                
                <Switch
                  value={this.props.sendEmail}
                  onChange={this.onChangeSendEmail}
                  color='light'
                >
                  send me an email <span className='has-text-lighter'> - {emailOrMessage}</span>
                </Switch>

                <Switch
                  value={this.props.callWebhook}
                  onChange={this.toggleWebhookForm}
                  color='light'
                >
                  trigger a webhook
                </Switch>

                <div className={classnames(
                  'accordion-max-height',
                  {
                    'accordion-max-height-enter-done': this.props.callWebhook
                  }
                )}>
                  {(
                    currentUserData.currentUser &&
                    !currentUserData.currentUser.confirmedAt
                  ) && <>
                      <p className='color-block is-purple has-text-centered'>
                        <br />
                        Webhooks will not fire until you have confirmed your '{email}' email address first:
                        <br /><Link className='has-underline has-text-lighter' to={routes.ACCOUNT_SETTINGS}>Confirm on Settings</Link>
                        <br />
                        <br />
                      </p>
                    </>
                  }

                  <p className='has-text-light'>
                    <small>
                      You can insert variables into webhooks using double curlies.  For example: {"{{transaction.value}}"}
                    </small>
                  </p>

                  <form onSubmit={(e) => e.preventDefault()} className='form is-inverted'>
                    <label
                      className='label'
                      htmlFor='webhook-url-input'
                    >
                      Webhook GET or POST URL
                    </label>
                    <WebhookUrlInput
                      placeholder='https://www.test.com?var1={{block.number}}'
                      value={this.props.webhookUrl || ''}
                      onChange={this.props.onChangeWebhookUrl}
                      webhookBody={this.props.webhookBody}
                    />

                    <label
                      className='label'
                      htmlFor='webhook-body-textarea'
                    >
                      POST Body (optional)
                    </label>

                    <WebhookBodyInput
                      value={this.props.webhookBody || ''}
                      onChange={this.props.onChangeWebhookBody}
                    />

                    <h6
                      className='is-size-6'
                    >
                      HTTP Headers (Optional)
                    </h6>

                    {(this.props.event.webhookHeaders || []).map((webhookHeader, index) => {
                      return <WebhookHeaderForm
                        key={webhookHeader.id ? webhookHeader.id : `new-header-${index}`}
                        webhookHeader={webhookHeader}
                        onChange={(webhookHeader) => this.props.onChangeWebhookHeader(webhookHeader, index)}
                        onRemove={(webhookHeader) => this.props.onDeleteWebhookHeader(webhookHeader, index)}
                      />
                    })}

                    <button
                      className='button  has-fat-icons has-icon plus-button mt10 pl10 pr10 is-light is-small'
                      onClick={this.props.onAddWebhookHeader}>
                      <Plus
                        className='icon__button has-stroke-white'
                      />
                    </button>
                  </form>
                </div>


              </div>
            </div>
          </div>
        </>
      )
    }
  }
