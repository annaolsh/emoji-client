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
      storyID: 0,
      originalContent: '',
      creator: '',
      translatedContent: '',
      stories: []
    }
  }

  handleTranslate(event) {
    this.setState({
      originalContent: event.target.value,
      translatedContent: this.translate(event.target.value)
    })
  }

  translate(text){
    let splittedText = text.split(" ")  // ["i", "love!", "trees"]
    return splittedText.map( word => {
      let punctuationArray = []
      let pureWord = word.split("").map( char => {
        if (/\w/.test(char)){
          return char
        } else {
          punctuationArray.push(char)
        }
      })
      console.log(pureWord.join(""))
      if (Object.keys(emojiMap).includes(pureWord.join(""))) {
        return emojiMap[pureWord.join("")] + punctuationArray.join("")
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


  handleSubmit (id) {
    return event => {
      event.preventDefault()
      console.log("story id :", id)
      const entry = this
      if (this.state.stories.find(story => story.id === id)) {
        fetch(`http://localhost:3000/stories/${id}`, {
          method: 'PATCH',
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
          entry.setState({
            stories: data,
            storyID: 0,
            originalContent: "",
            translatedContent: "",
            creator: ""
          })
        })


      } else {
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
            return {
              stories: [...prevState.stories, data],
              originalContent: "",
              translatedContent: "",
              creator: ""
            }
          })
        })
      }
    }
  }


  handleEdit(id){
    console.log("This is edit method running")
    console.log(id)
    let editStory = this.state.stories.find(story => story.id === id)
    console.log(editStory.original_content)

    this.setState({
      originalContent: editStory.original_content,
      translatedContent: editStory.translated_content,
      creator: editStory.creator,
      storyID: editStory.id,
    })

  }

  handleDelete(id){
    // let deleteStory = this.state.stories.find(story => story.id === id)

    fetch(`http://localhost:3000/stories/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => this.setState({ stories: data }) )

    console.log("This is delete method running")
  }



  render() {
    return(
      <div className="container">
        <Translator
          handleTranslate={this.handleTranslate.bind(this)}
          translatedContent={this.state.translatedContent}
          originalContent={this.state.originalContent}
          creator={this.state.creator}
          handleSubmit={this.handleSubmit.bind(this)}
          handleCreator={this.handleCreator.bind(this)}
          stories={this.state.stories}
          storyID={this.state.storyID}
        />
        <Stories
          stories={this.state.stories}
          edit={this.handleEdit.bind(this)}
          delete={this.handleDelete.bind(this)}

        />
      </div>
    )
  }
}
