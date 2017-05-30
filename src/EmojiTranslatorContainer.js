import React, { Component } from 'react';
import Translator from './components/Translator';
import Stories from './components/Stories';

const emojiMap = {
  "tree": "🌲",
  "face": "😀",
  "poop": "💩",
  "like": "❤️",
  "love": "❤️",
}

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
      //translatedContent: event.target.value.toUpperCase()
      translatedContent: this.mapOC(event.target.value)
    })
  }

  mapOC(text){
    return text.split(" ").map( word => {
        if (emojiMap[word]) {
          return emojiMap[word]
      } else {
        return word
      }
    }).join(" ")
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
    const entry = this
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
      .then(function(data){
        //console.log('data: ', data);
        entry.setState(prevState => {
          return {stories: [...prevState.stories, data]}
        })
      })

  }

  // translate() {
  //   this.setState({
  //     translatedContent:
  //   })
  // }



  render() {
    return(
      <div className="container">
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
