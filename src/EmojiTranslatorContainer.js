import React, { Component } from 'react';
import Translator from './components/Translator';
import Stories from './components/Stories';

export default class EmojiTranslatorContainer extends Component {
  constructor() {
    super()
    this.state = {
      originalContent: '',
      creator: '',
      translatedContent: '',
      stories: []
    }
  }

  handleTranslate(event) {
    this.setState({
      originalContent: event.target.value,
      translatedContent: event.target.value.toUpperCase()
    })
    console.log('from handleTranslate: ', this.state.originalContent);
  }

  handleCreator(event) {
    this.setState({
       creator: event.target.value
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/stories', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({
        stories: data
      }))
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch('http://localhost:3000/stories', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({story: {
        original_content: this.state.originalContent,
        creator: this.state.creator,
        translated_content: this.state.translatedContent
      }})
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  // translate() {
  //   this.setState({
  //     translatedContent:
  //   })
  // }



  render() {
    return(
      <div>
        <Translator
          handleTranslate={this.handleTranslate.bind(this)}
          translatedContent={this.state.translatedContent}
          handleSubmit={this.handleSubmit.bind(this)}
          handleCreator={this.handleCreator.bind(this)}
        />
        <Stories
          stories={this.state.stories}
        />
      </div>
    )
  }
}
