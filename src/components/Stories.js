import React from 'react'

export default (props) => {

  return(
    <div className="container black">
      <h1 className="center-align">Stories</h1>
      {props.stories.map((story, index) => {
        return(
          <div className="container">
            <div className="card">
              <div className="card-content">
                <span className="card-title ">{story.title}</span>
                <p id="translated-text">{story.translated_content}</p>
              </div>
              <div className="card-action">
                <a href="#translatorBox" onClick={function(){props.edit(story.id)}}> Edit </a>
                <a href="#" onClick={function(){props.delete(story.id)}}> Delete </a>

              </div>
            </div>

          </div>

        )
      }).reverse()}

    </div>
  )
}
