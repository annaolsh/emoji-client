import React, { Component } from 'react';
import Translator from './components/Translator';
import emojiLegend from './lib/emoji_to_english.js';
import Stories from './components/Stories';
import { Background, Parallax } from '../node_modules/react-parallax';

export default class EmojiTranslatorContainer extends Component {
  constructor() {
    super()
    this.state = {
      storyID: 0,
      originalContent: '',
      title: '',
      translatedContent: '',
      stories: [],
      editing: false
    }
  }

  handleTranslate(event) {
    this.setState({
      originalContent: event.target.value,
      translatedContent: this.translate(event.target.value)
    })
  }

  translate(text){
    let splittedText = text.replace( /\n/g, " " ).split( " " )  // ["i", "love!", "trees"]
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
      if (Object.keys(emojiLegend).includes(pureWord.join("").toLowerCase())) {
        return emojiLegend[pureWord.join("").toLowerCase()] + punctuationArray.join("")
    } else {
      return word
    }
    }).join(" ")
  }

  handleTitle(event) {
    this.setState({
       title: event.target.value
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
            title: this.state.title,
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
            title: "",
            editing: false
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
            title: this.state.title,
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
              title: ""
            }
          })
        })
      }
    }
  }


  handleEdit(id){
    let editStory = this.state.stories.find(story => story.id === id)
    this.setState({
      originalContent: editStory.original_content,
      translatedContent: editStory.translated_content,
      title: editStory.title,
      storyID: editStory.id,
      editing: true
    })

  }

  handleDelete(id){

    if (window.confirm("😱 You really want to delete this story?!")) {
      fetch(`http://localhost:3000/stories/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(data => this.setState({ stories: data }) )
    }
  }

  render() {
    return(
        <div>


          <Parallax strength={300}>
            <Background>
              <div className="row">
                <div style={{
                  width: 800,
                  height: 300,
                  // backgroundColor: '#450093'
                }}></div>
              </div>

              <div className="row">
                <div className="col s4">
                  <img  src="https://68.media.tumblr.com/c9fec603315e45b1d563cd766205aad8/tumblr_n5xpluDjJt1tbaizso1_250.png" strength={200}/>
                </div>
                <div className="col s4">
                </div>
                <div className="col s4 offset-3">
                  <img src="http://www.pngall.com/wp-content/uploads/2016/06/Love-Hearts-Eyes-Emoji-PNG.png" strength={1000}/>
                </div>
              </div>
              <img src="http://www.hey.fr/fun/emoji/android/en/android/658-emoji_android_fearful_face.png" strength={1000}/>

              <img  src="https://cdn.shopify.com/s/files/1/1061/1924/files/Slice_Of_Pizza_Emoji.png?9898922749706957214" strength={200}/>
              
            </Background>

            <div className="container">
              <Translator
                handleTranslate={this.handleTranslate.bind(this)}
                translatedContent={this.state.translatedContent}
                originalContent={this.state.originalContent}
                title={this.state.title}
                handleSubmit={this.handleSubmit.bind(this)}
                handleTitle={this.handleTitle.bind(this)}
                stories={this.state.stories}
                storyID={this.state.storyID}
                editing={this.state.editing}
              />
              <br/>
              <Stories
                stories={this.state.stories}
                edit={this.handleEdit.bind(this)}
                delete={this.handleDelete.bind(this)}

              />


            </div>
          </Parallax>
          </div>

          )
  }
}
