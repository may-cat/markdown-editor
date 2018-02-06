import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, NavLink, Route, Redirect, Switch} from 'react-router-dom'

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

const {NODE_ENV} = process.env

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
];


class AppField extends React.Component {
    /*
    state = {
        "code": "my_some_value",
        "type": "string",
        "multiple": false,
        "readonly": false,
        "title": "Some String Value",
        "value": "42"
    };
    */
    state = {};

    constructor(props) {
        super(props);
        this.state = props.params;
        this.state.autocompleteOpen = false;
        this.state.addVisible = true;
    }

    render() {
        return (
            <tr>
                <td className="">{this.state.title}</td>
                <td>
                    {this.state.multiple ? this.renderMultipleValue() : this.renderSingleValue()}
                </td>
            </tr>
        )
    }

    onFieldChange(event) {
        console.log("any field change event");
        console.log(event);
        if (!this.state.multiple) {
            this.setState({'value': event.target.value})
        }
    }

    renderSingleValue(data = {}) {
        let object = this.state;
        if ('code' in data)
            object = data;
        let self = this;

        return (
            <input type="text" name={object.code} className="form-control" placeholder="Enter value"
                   value={object.value} onChange={self.onFieldChange.bind(this)}/>
        )
    }

    renderMultipleValue() {
        let self = this;
        return (
            <span>
                Calling renderSingleValue() and drawing delete and add buttons
                {this.state.value.map((val, j) => {
                    let data = {
                        'field_name': this.state.code + "[]",
                        'value': val
                    };
                    return (
                        self.renderSingleValue(data)
                    )
                })}
            </span>
        )
    }
}

/**
 * Link field is a component, showing links between two markdown files.
 * It is visualized as one or more links. If it is multiple field - we can create or remove values.
 */
class LinkField extends AppField {
    /*
    state = {
        "code": "responsing",
        "type": "link",
        "multiple": true,
        "readonly": false,
        "title": "!Ответственный",
        "value": [
            {
                "code": "PPL-12",
                "title": "Антон Васильев"
            },
            {
                "code": "PPL-24",
                "title": "Пётр Петрович"
            }
        ]
    };
    */

    renderSingleValue(data = {}) {
        let object = this.state;
        if ('value' in data)
            object = data;

        return (
            <a href={object.value.code}>{object.value.title}</a>
        )
    }

    renderMultipleValue() {
        let self = this;

        return (
            <span>
                {this.state.value.map((val, j) => {
                    let data = {
                        'value': {
                            'code': val.code,
                            'title': val.title
                        }
                    };
                    return (
                        <p>{self.renderSingleValue(data)} &nbsp; <span>[del]</span></p>
                    )
                })}
                {this.state.addVisible ?
                    <p onClick={self.addNewValueStep1.bind(this)}>Add new</p>
                    : null
                }
                {this.state.autocompleteOpen ?
                    <p>
                        <p>Name:
                            <input key={this.state.code + "_autocomplete_name"} type="text"
                                   onChange={self.addNewValueStepName.bind(this)}/>
                        </p>
                        <p>Code: <input key={this.state.code + "_autocomplete_code"} type="text"
                                        onChange={self.addNewValueStepCode.bind(this)}/></p>
                        <p onClick={self.addNewValueStep2.bind(this)}>Submit</p>
                    </p>
                    : null
                }
            </span>
        )
    }

    /**
     * First step of adding link - is asking user, where do we link
     */
    addNewValueStep1() {
        let state = this.state;
        state.autocompleteOpen = true;
        state.addVisible = false;
        state.autocompleteName = '';
        state.autocompleteCode = '';
        this.setState(state);
    }

    /**
     * When name changed - we should update state
     */
    addNewValueStepName(event) {
        this.setState({'autocompleteName': event.target.value})
    }

    /**
     * When code changed - we should update state
     */
    addNewValueStepCode(event) {
        this.setState({'autocompleteCode': event.target.value})
    }

    /**
     * When user filled name and code and clicked "submit" - we should create link.
     * Also, we should hide our input fields and make cleanup.
     */
    addNewValueStep2() {
        let state = this.state;
        state.value.push({
            "code": state.autocompleteCode,
            "title": state.autocompleteName
        });
        state.autocompleteOpen = false;
        state.addVisible = true;
        this.setState(state);
    }

}

class IntegerField extends AppField {
    /*
    state = {
        "code": "my_integer_value",
        "type": "integer",
        "multiple": false,
        "readonly": false,
        "title": "My Integer Value",
        "value": "42"
    };
    */

    renderSingleValue(data = {}) {
        let object = this.state;
        if ('code' in data)
            object = data;
        let self = this;

        return (
            <input type="text" name={object.code} className="form-control" placeholder="Enter value"
                   value={object.value} onChange={self.onFieldChange.bind(this)}/>
        )
    }

    renderMultipleValue() {
        let self = this;
        return (
            <span>
                Calling renderSingleValue() and drawing delete and add buttons
                {this.state.value.map((val, j) => {
                    let data = {
                        'code': this.state.code + "[]",
                        'value': val
                    };
                    return (
                        self.renderSingleValue(data)
                    )
                })}
            </span>
        )
    }
}


/**
 * App.
 *
 * @type {Component}
 */

class App extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let url = 'http://localhost:8080/MOSRU-RQ12.json';

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('ERROR HERE');
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState(data))
            .catch(error => function () {
                alert('OOOOPS')
            });
    }

    handleSubmit(event) {
        console.log("FORM SUBMIT");
        console.log(this.state);
        alert('A name was submitted: ');
        event.preventDefault();
    }

    render() {
        if (!("text" in this.state)) {
            return (
                <span/>
            )
        }
        const self = this;
        return (
            <div className="app">
                <nav className="navbar navbar-expand-md bg-primary navbar-dark">
                    <div className="container">
                        <a className="navbar-brand" href="#">DocDD</a>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                                data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse text-center justify-content-end"
                             id="navbar2SupportedContent">
                            <ul className="navbar-nav">
                                {EXAMPLES.map(([name, Component, path, isDev]) => (
                                    (NODE_ENV != 'production' || !isDev) && (
                                        <NavLink key={path} to={path} className="nav-item tab nav-link"
                                                 activeClassName="active">
                                            <i className="fa d-inline fa-lg fa-bookmark-o"></i>&nbsp;{name}
                                        </NavLink>
                                    )
                                ))}
                            </ul>
                            <a className="btn navbar-btn btn-primary ml-2 text-white"><i
                                className="fa d-inline fa-lg fa-user-circle-o"></i> Sign in</a>
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
                            <form onSubmit={this.handleSubmit}>
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-md-10 align-self-center text-right"> Ветка:</div>
                                                <div className="col-md-2 text-center"><strong> master </strong></div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th>Параметр</th>
                                                        <th>Значение</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.options.map((object, i) => {
                                                        switch (object.type) {
                                                            case 'integer':
                                                                return (
                                                                    <IntegerField params={object} key={object.code}
                                                                                  onChange={self.changeFieldInteger.bind(this)}/>
                                                                );
                                                            case 'link':
                                                                return (
                                                                    <LinkField params={object} key={object.code}/>
                                                                );
                                                        }
                                                    })}
                                                    <tr>
                                                        <td><a href="#" onClick={this.handleClick}>Add new parameter</a>
                                                        </td>
                                                        <td>&nbsp;</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <RequirementsEdit text={this.state.text}
                                                                  onChange={self.changeText.bind(this)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="submit" className="btn btn-primary btn-lg w-50" value="Submit"/>
                                    <a className="btn btn-lg w-25 btn-link" href="">Back to list</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    changeText(event) {
        console.log("change text called");
        console.log(event);
        this.setState({'text': event.target.value})
    }

    changeFieldInteger(event) {
        console.log("change integer field called");
        console.log(event);
    }
}

/**
 * Router.
 *
 * @type {Element} router
 */

const router = <HashRouter><App myparam="someparam"/></HashRouter>;

/**
 * Attach `Perf` when not in production.
 */

/*
if (NODE_ENV != 'production') {
  window.Perf = require('react')
 */

const root = document.body.querySelector('main');
ReactDOM.render(router, root);