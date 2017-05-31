import React from 'react'

export default (props) => {

  function editing(){
    if (props.editing === true){
      return (
        <div className="row ">
          <div className="col s6">
            <div className="card yellow">

              <span className="card-title"><p>  Edit this story:</p></span>
            </div>
          </div>
          <div className="col s6"></div>
        </div>

      )
    } else {
      return (
      <div className="row">
        <div className="col s6">
          <div className="card white">
            <span className="card-title z-depth-4"><p>  Create a new story!</p></span>
          </div>
        </div>
        <div className="col s6"></div>
      </div>
      )
    }
  }



  return(
    <div>
      <h1 className="center-align">English => Emoji</h1>
      <h5 className="center-align">Intergalactic Translator</h5>
      <div className="container" id="translatorBox">
        <div className="card div-border-black">
          <div className="div-border-white">

            {editing()}
            <form onSubmit={props.handleSubmit(props.storyID)}>
              <div className="row">
                <div className="input-field col s6">
                  <textarea id="original" className="materialize-textarea" onChange={props.handleTranslate} placeholder="Enter your story here:" value={props.originalContent}/>
                </div>
                <div className="input-field col s6">
                  <textarea id="translated" className="materialize-textarea" placeholder="Translated text appears here!" value={props.translatedContent} />
                </div>
              </div>
              <div className="row">

                <div className="col s4">
                </div>
                <div className="col s4">
                  <input onChange={props.handleTitle} id="title" type="text" placeholder="Title" value={props.title} />
                </div>
                <div className="col s4">
                </div>

              </div>
              <div className="row center-align">
                <input className="waves-effect waves-light type btn" type="submit" value="Save Story"/>

              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
