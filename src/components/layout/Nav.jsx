import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTimeout from 'react-timeout'
import { Activity, FileText, Power, Search, Send, Settings } from 'react-feather'
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'

import { withCurrentUser } from '~/components/withCurrentUser'
import { signOutMutation } from '~/mutations/signOutMutation'
import { getSystemInfo } from '~/utils/getSystemInfo'
import { notusToast } from '~/utils/notusToast'
import NotusLogo from '~/assets/images/notus-logo--black-blue-pink4.svg'
import * as routes from '~/../config/routes'

// const debug = require('debug')('notus:components:Nav')

const Y_POS_NAV_APPEARS = 770

export const Nav = graphql(signOutMutation, { name: 'signOutMutation' })(
  withCurrentUser(
    withRouter(
      ReactTimeout(class _Nav extends Component {
        state = {
          mobileNavActive: false,
          navIsInFront: false,
          scrollTop: 0,
          signedOut: false,
          systemInfo: {},
        }

        async componentDidMount() {
          // const systemInfo = await getSystemInfo()
          // this.setState({ systemInfo })

          window.addEventListener('scroll', this.listenToScroll)
          this.listenToScroll()
        }

        componentWillUnmount() {
          window.removeEventListener('scroll', this.listenToScroll)
        }

        listenToScroll = () => {
          const scrollTop = window.pageYOffset !== undefined ?
            window.pageYOffset :
            (document.documentElement || document.body.parentNode || document.body).scrollTop

          this.setState({
            scrollTop
          })
        }

        handleToggleMobileNav = (e) => {
          if (this.state.mobileNavActive) {
            this.closeMobileNav()
          } else {
            this.setState({ 
              mobileNavActive: true,
              navIsInFront: true
            })

            if (this.navFrontFalseTimeout) {
              this.props.clearTimeout(this.navFrontFalseTimeout)
            }
          }
        }

        closeMobileNav = (e) => {
          this.setState({ mobileNavActive: false })

          this.navFrontFalseTimeout = this.props.setTimeout(() => {
            this.setState({ navIsInFront: false })
          }, 400)
        }

        handleSignOut = (e) => {
          this.props.signOutMutation().then(() => {
            this.closeMobileNav()

            notusToast.info('Successfully signed out. Thanks for using Notus!')
            this.props.history.push(routes.SIGNIN)
          }).catch(error => {
            console.error(error)
          })
        }

        homeOrMyEventsRoute = () => {
          const { currentUserData } = this.props || {}
          const { currentUser } = currentUserData || {}

          if (!this.isMarketingRoute() && currentUser) {
            return routes.MY_EVENTS
          } else {
            return routes.HOME
          }
        }

        isMarketingRoute = () => {
          const { pathname } = this.props.location

          return routes.MARKETING_ROUTES.includes(pathname)
        }

        isHomeRoute = () => {
          const { pathname } = this.props.location

          return pathname === routes.HOME
        }

        render () {
          const { currentUserData } = this.props || {}
          const { currentUser } = currentUserData || {}
          
          let myEvents, 
            links,
            signInSignUpLinks

          const scrolledDown = this.state.scrollTop > Y_POS_NAV_APPEARS
          const showFixedNav = (this.isHomeRoute() && scrolledDown) || this.state.mobileNavActive

          signInSignUpLinks = <>
            <NavLink
              exact
              to={routes.SIGNIN}
              className='navbar-item'
              onClick={this.closeMobileNav}
              activeClassName='is-active'
            >
              Sign in
            </NavLink>
            <NavLink
              exact
              to={routes.SIGNUP}
              className='navbar-item bold'
              onClick={this.closeMobileNav}
              activeClassName='is-active'
            >
              Sign up
            </NavLink>
          </>

          // if (!currentUser &&
          //   (this.state.systemInfo.mobileOS === 'unknown')
          // ) { 
          //   links = <>
          //     {signInSignUpLinks}
          //   </>
          // }

          if (!currentUser) {
            links = <>
              {signInSignUpLinks}
              <hr />
              <NavLink
                exact
                to={routes.ABOUT_PAGE}
                className='navbar-item hide-on-desktop'
                onClick={this.closeMobileNav}
                activeClassName='is-active'
              >
                About
              </NavLink>
              <a
                href='https://discord.gg/WXMDXqb'
                target='_blank'
                rel='noopener noreferrer'
                className='navbar-item hide-on-desktop'
              >
                Discord
              </a>
              <NavLink
                exact
                to={routes.TERMS_PAGE}
                className='navbar-item hide-on-desktop'
                onClick={this.closeMobileNav}
                activeClassName='is-active'
              >
                Terms
              </NavLink>
              <NavLink
                exact
                to={routes.PRIVACY_PAGE}
                className='navbar-item hide-on-desktop'
                onClick={this.closeMobileNav}
                activeClassName='is-active'
              >
                Privacy
              </NavLink>
              <NavLink
                exact
                to={routes.SUPPORT_PAGE}
                className='navbar-item hide-on-desktop'
                onClick={this.closeMobileNav}
                activeClassName='is-active'
              >
                Support
              </NavLink>
            </>
          } else {
            links = (
              <>
                <NavLink
                  exact
                  className='navbar-item bold hide-not-home button'
                  to={routes.MY_EVENTS}
                  onClick={this.closeMobileNav}
                  activeClassName='is-active'
                >
                  <Send className='navbar-item--icon' /> Go to App
                </NavLink>
                <NavLink
                  exact
                  className='navbar-item hide-on-home'
                  to={routes.ACCOUNT_SETTINGS}
                  onClick={this.closeMobileNav}
                  activeClassName="is-active"
                >
                  <Settings className='navbar-item--icon' /> Settings
                </NavLink>
                <button
                  className='navbar-item button hide-on-home'
                  onClick={this.handleSignOut}
                >
                  <Power className='navbar-item--icon' /> Sign out
                </button>
              </>
            )

            myEvents =
              <>
                <NavLink
                  to={routes.MY_EVENTS}
                  className='navbar-item'
                  onClick={this.closeMobileNav}
                  activeClassName='is-active'
                >
                  <Activity className='navbar-item--icon' /> Events
                </NavLink>
                <NavLink
                  to={routes.CONTRACTS}
                  className='navbar-item'
                  onClick={this.closeMobileNav}
                  activeClassName='is-active'
                >
                  <FileText className='navbar-item--icon' /> Contracts
                </NavLink>
                <NavLink
                  exact
                  to={routes.DISCOVER_EVENTS}
                  className='navbar-item'
                  onClick={this.closeMobileNav}
                  activeClassName='is-active'
                >
                  <Search className='navbar-item--icon' /> Discover
                </NavLink>
              </>
          }

          const innerNav = (
            <div className='container'>
              <div className='row navbar-menu-container'>
                <div className='navbar-brand col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-2'>
                  <Link
                    to={this.homeOrMyEventsRoute()}
                    className='navbar-item'
                    onClick={this.closeMobileNav}
                  >
                    <NotusLogo />
{/* 
                    {!showFixedNav
                      || this.state.navIsInFront ?
                      <NotusLogo /> :
                      <NotusLogo />
                    } */}
                  </Link>
                </div>

                <div className='col-xs-6 is-hidden-tablet has-text-right'>
                  <button
                    className={classnames(
                      'burger',
                      'burger-slip',
                      { 'open': this.state.mobileNavActive }
                    )}
                    data-target='navbar-menu'
                    onClick={this.handleToggleMobileNav}
                  >
                    <div className='burger-lines' />
                  </button>
                </div>

                <div id='navbar-menu' className={classnames(
                  'navbar-menu',
                  'col-xs-12',
                  'col-sm-8',
                  'col-md-9',
                  'col-lg-9',
                  'col-xl-10',
                  { 'is-active': this.state.mobileNavActive }
                )}>
                  <div className='navbar-start'>
                    {myEvents}
                  </div>
                  <div className='navbar-end'>
                    {links}
                  </div>
                </div>
              </div>

            </div>
          )

          const mainNav = (
            <nav className={classnames(
              'navbar',
              'is-transparent',
              {
                'is-active': this.state.mobileNavActive,
                'is-top-layer': this.state.navIsInFront
              }
            )}>
              {innerNav}
            </nav>
          )

          const mainNavFixed = (
            <nav
              className={classnames(
                'navbar',
                'is-transparent',
                'is-fixed-top',
                {
                  'is-active': this.state.mobileNavActive,
                  'is-top-layer': this.state.navIsInFront,
                  'is-hidden': !showFixedNav
                }
              )}
            >
              {innerNav}
            </nav>
          )

          return (
            <>
              <div
                className={classnames(
                  'nav-background',
                  'no-select', 
                  {
                    'is-active': this.state.mobileNavActive
                  }
                )}
                onClick={this.closeMobileNav}
              />

              {mainNav}
              {mainNavFixed}
            </>
          )
        }
      })
    )
  )
)