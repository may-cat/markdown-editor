
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, NavLink, Route, Redirect, Switch } from 'react-router-dom'

import CheckLists from './check-lists'
import CodeHighlighting from './code-highlighting'
import Embeds from './embeds'
import Emojis from './emojis'
import ForcedLayout from './forced-layout'
import HoveringMenu from './hovering-menu'
import Iframes from './iframes'
import Images from './images'
import Links from './links'
import MarkdownPreview from './markdown-preview'
import MarkdownShortcuts from './markdown-shortcuts'
import PasteHtml from './paste-html'
import PlainText from './plain-text'
import Plugins from './plugins'
import RTL from './rtl'
import ReadOnly from './read-only'
import RichText from './rich-text'
import Tables from './tables'
import RequirementsEdit from './requirements'

import DevHugeDocument from './dev/huge-document'
import DevPerformancePlain from './dev/performance-plain'
import DevPerformanceRich from './dev/performance-rich'

/**
 * Environment.
 *
 * @type {String}
 */

const { NODE_ENV } = process.env

/**
 * Examples.
 *
 * @type {Array}
 */

const EXAMPLES = [
  ['Requirements', RequirementsEdit, '/requirements'],
  ['Rich Text', RichText, '/rich-text'],
  ['Plain Text', PlainText, '/plain-text'],
  ['Hovering Menu', HoveringMenu, '/hovering-menu'],
  ['Links', Links, '/links'],
  ['Images', Images, '/images'],
  ['Embeds', Embeds, '/embeds'],
  ['Emojis', Emojis, '/emojis'],
  ['Markdown Preview', MarkdownPreview, '/markdown-preview'],
  ['Markdown Shortcuts', MarkdownShortcuts, '/markdown-shortcuts'],
  ['Check Lists', CheckLists, '/check-lists'],
  ['Code Highlighting', CodeHighlighting, '/code-highlighting'],
  ['Tables', Tables, '/tables'],
  ['Paste HTML', PasteHtml, '/paste-html'],
  ['Read-only', ReadOnly, '/read-only'],
  ['RTL', RTL, '/rtl'],
  ['Plugins', Plugins, '/plugins'],
  ['Iframes', Iframes, '/iframes'],
  ['Forced Layout', ForcedLayout, '/forced-layout'],

  ['DEV:Huge', DevHugeDocument, '/dev-huge', true],
  ['DEV:Plain', DevPerformancePlain, '/dev-performance-plain', true],
  ['DEV:Rich', DevPerformanceRich, '/dev-performance-rich', true],
]

class ArtifactFields  extends React.Component {
    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Параметр</th>
                    <th>Значение</th>
                </tr>
                </thead>
                <tbody>
                {myData.options.map((object,i)=>{
                    switch(object.type) {
                        case 'integer':
                            return (
                            <tr>
                                <td className="">{object.title}</td>
                                <td>
                                    {object.multiple?(
                                        object.value.map((val,j)=>{
                                            let field_name = object.code+"[]"
                                            return (
                                                <input type="text" name={field_name} className="form-control" placeholder="Enter value" value={val} />
                                            )
                                        })
                                    ):(
                                        <input type="text" name={object.code} className="form-control" placeholder="Enter value" value={object.value} />
                                    )}
                                </td>
                            </tr>
                            )
                        case 'link':
                            return(
                            <tr>
                                <td className="">{object.title}</td>
                                <td>
                                    {object.multiple?(
                                        object.value.map((val,j)=>{
                                            let field_name = object.code+"[]"
                                            return (
                                                <p>
                                                    <a href={val.code}>{val.code} - {val.title}</a>
                                                </p>
                                            )
                                        })
                                    ):(
                                        <p>
                                            <a href={object.value.code}>{object.value.code} - {object.value.title}</a>
                                        </p>
                                    )}
                                </td>
                            </tr>
                            )
                    }
                })}
                </tbody>
            </table>
        )
    }
}


/**
 * App.
 *
 * @type {Component}
 */

class App extends React.Component {

    render() {
        return (
            <div className="app">
                  <nav className="navbar navbar-expand-md bg-primary navbar-dark">
                      <div className="container">
                          <a className="navbar-brand" href="#">DocDD</a>
                          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                          </button>
                          <div className="collapse navbar-collapse text-center justify-content-end" id="navbar2SupportedContent">
                              <ul className="navbar-nav">
                                  {EXAMPLES.map(([ name, Component, path, isDev ]) => (
                                      (NODE_ENV != 'production' || !isDev) && (
                                          <NavLink key={path} to={path} className="nav-item tab nav-link" activeClassName="active">
                                              <i className="fa d-inline fa-lg fa-bookmark-o"></i>&nbsp;{name}
                                          </NavLink>
                                      )
                                  ))}
                              </ul>
                              <a className="btn navbar-btn btn-primary ml-2 text-white"><i className="fa d-inline fa-lg fa-user-circle-o"></i> Sign in</a>
                          </div>
                      </div>
                  </nav>
                  <div className="py-5">
                      <div className="container">
                          <div className="row">
                              <div className="col-md-12">
                                  <h1 className="">MOSRU-RQ12 Создание страницы "Новости"</h1>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col-md-12">
                                  <div className="card">
                                      <div className="card-header">
                                          <div className="row">
                                              <div className="col-md-10 align-self-center text-right"> Ветка: </div>
                                              <div className="col-md-2 text-center"><strong> master </strong></div>
                                          </div>
                                      </div>
                                      <div className="card-body">
                                          <div className="row">
                                              <ArtifactFields />
                                          </div>
                                          <div className="row">
                                              <Switch>
                                                  {EXAMPLES.map(([ name, Component, path, isDev ]) => (
                                                      <Route key={path} path={path} component={Component} />
                                                  ))}
                                                  <Redirect from="/" to="/rich-text" />
                                              </Switch>
                                          </div>
                                      </div>
                                  </div>
                                  <a className="btn btn-primary btn-lg w-50" href="">Save </a>
                                  <a className="btn btn-lg w-25 btn-link" href="">Back to list</a>
                              </div>
                          </div>
                      </div>
                  </div>
            </div>
        )
    }

}

/**
 * Router.
 *
 * @type {Element} router
 */

const router = <HashRouter><App /></HashRouter>

/**
 * Attach `Perf` when not in production.
 */

/*
if (NODE_ENV != 'production') {
  window.Perf = require('react')
 */


const root = document.body.querySelector('main')
ReactDOM.render(router, root)