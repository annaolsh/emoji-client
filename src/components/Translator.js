import React from 'react'

export default (props) => {
  return(
    <div className="container" id="translatorBox">
      <h1>English => Emoji</h1>
      <form onSubmit={props.handleSubmit(props.storyID)}>
        <textarea
          id="original"
          onChange={props.handleTranslate}
          placeholder="Enter your story here:"
          value={props.originalContent}
        />
        <br></br>
        <input
          onChange={props.handleCreator}
          id="creator"
          type="text"
          placeholder="Author"
          value={props.creator}
        />
        <br></br>

        <textarea
          id="translated"
          placeholder="Translated text appears here!"
          value={props.translatedContent}
        />
        <br></br>

        <input type="submit" value="Save Story"/>

      </form>
    </div>
  )
}
