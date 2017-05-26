import React from 'react'

export default (props) => {
  return(
    <div>
      <h1>Stories</h1>
      {props.stories.map((story) => {
        return(
          <ul>
            <div className="card card-panel">
              <li>{story.translated_content}</li>
              <li>By: {story.creator}</li>
            </div>
          </ul>
        )
      }).reverse()}
    </div>
  )
}
