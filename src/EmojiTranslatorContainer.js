import React, { Component } from 'react';
import Translator from './components/Translator';
import Stories from './components/Stories';

export default class EmojiTranslatorContainer extends Component {
  constructor() {
    super()

  }

  render(){
    return(
      <div>
        <Translator />
        <Stories />
      </div>
    )
  }
}
