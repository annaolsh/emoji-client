import React from 'react'

export default (props) => {
  return(
    <div>
      <h1>Stories</h1>
      {props.stories.map((story, index) => {
          return(
            <ul key={index}>
              <div className="card card-panel">
                <li>ID: {story.id}</li>
                <li>{story.translated_content}</li>
                <li>By: {story.creator}</li>
                <a className="btn" href="#translatorBox" onClick={function(){props.edit(story.id)}}> Edit </a>
                <button className="btn" onClick={function(){props.delete(story.id)}}> Delete </button>
              </div>
            </ul>
          )
        }).reverse()}
    </div>
  )
}
