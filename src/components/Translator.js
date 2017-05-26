import React from 'react'

export default (props) => {
  return(
    <div>
      <h1>This is a Translator component</h1>
      <form onSubmit={props.handleSubmit}>
        <textarea id="original" onChange={props.handleTranslate} placeholder="Enter your story here:"/>
        <br></br>
        <input
          onChange={props.handleCreator}
          id="creator"
          type="text"
          placeholder="Author"
        />
        <br></br>

        <textarea
          id="translated"
          value={props.translatedContent}
        />
          <br></br>

        <input type="submit" value="Save Story"/>

      </form>
    </div>
  )
}
