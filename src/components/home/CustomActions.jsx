import React from 'react'
// import { Link } from 'react-router-dom'
import { SlantSVG } from '~/components/home/SlantSVG'
import { GitIcons } from '~/components/GitIcons'

// import * as routes from '~/../config/routes'

export const CustomActions = () => {
  return (
    <div
      className='container-fluid mt100 pt100 pb200 color-block is-positioned-relatively' 
      style={{ backgroundColor: '#0689d8' }}
    >
      <SlantSVG
        position='top'
        polygonClass='has-fill-dark'
        fill='#0689d8'
      />

      <div className='container'>
        <div className='row'>
          <div className='col-sm-6 has-text-right'>
            <GitIcons />
          </div>

          <div className='col-xs-12 col-sm-6 col-start-md-6'>
            <h4 className='is-size-1 animated pulse delay-2s has-text-weight-bold'>
              Custom Actions
            </h4>

            <br />

            <h5 className='is-size-6'>
              Trigger actions when an event occurs, such as "When a contract is ready to be withdrawn from ...
              <ul className='list pt20'>
                <li>... Send me a Slack message</li>
                <li>... And update an Oracle</li>
                <li>... Or anything else you dream up</li>
              </ul>
            </h5>

            <br />

            {/* <CodeBox /> */}
            {/* <p>
                  <a href='https://docs.notus.events'>Read the Developer Documentation</a>
                </p> */}
            {/* <Link
              to={routes.ABOUT_PAGE}
              className='button is-light is-small'
            >
              Learn more about Notus
            </Link> */}
          </div>
        </div>
      </div>

      <SlantSVG
        position='bottom'
        polygonClass='has-fill-dark'
      />
    </div>
  )
}