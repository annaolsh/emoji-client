import React from 'react'

export default (props) => {
  return(
    <div>
      <h1>This is a Stories component</h1>
      {props.stories.map((story) => {
        return(
          <ul>
            <li>{story.translated_content}</li>
            <li>By: {story.creator}</li>
          </ul>
        )
      })}
    </div>
  )
}
