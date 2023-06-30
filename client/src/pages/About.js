import React from 'react'
import TabulaFounder from '../images/TabulaFounder.jpg'
import './About.css'

const About = () => {
  return (
    <div>

      <div id='aboutContainer'>

        <img id="founderImg" src={TabulaFounder} atl='tabula homo founder posed nude in a seated position, the image is in black and white' />
        <div id='quoteContainer'>
          <p>
            "I think of posing as an
            acting performance.
            Like a silent movie.
            It’s not possible to
            freeze an emotion
            for hours on end.
            But I can create an emotional thread that
            weaves its way into every breath and each shift
            on my weight. I sometimes have a character
            that I play. Or sometimes it’s just me and my
            raw emotions from my day. No session is ever
            the same cuz my energy and the energy of the
            artists are never the same."
          </p>
        </div>
      </div>
      <div id='textAbout' >

        <p id = 'tagline'  style={{ fontFamily: 'Rampart One' }} >
          TABULA HOMO.

          FROM THE LATIN “TABULA”- MEANING PICTURE,
          SLATE, TABLET OR BOARD AND “HOMO” – PERSON,
          HUMAN, BEING. BUT ALSO, IN TODAY’S CULTURE,
          WE ASSOCIATE “HOMO” WITH BEING GAY OR QUEER.
        </p>

        <p id = 'intro'>
          For thousands
          of years, artists
          have studied the
          human figure.

          They stand or sit for hours on end, their eyes
          flicking back and forth from the figure to the
          canvas. Back and forth, back and forth. First,
          inspect the light and shadows of the tableau
          being presented. Then, check the work and
          back again to the figure.

          It’s a lonely
          and tiresome work
          being the artist.

          But for the model, well. It may be lonelier
          cuz you are there for it all, while under
          several spotlights.

        </p>

        <p id = 'punchy'  style={{ fontFamily: 'Rampart One' }}>
          The thing about
          Tabula Homo is that
          when you attend
          a session, you aren’t
          that lonely
          solitary artist.
        </p>
        <p id = 'end'>
          Yes, you can be in your practice.
          Yes, the model will create interest and
          drama and play with light and shadow.
          But you can attend from your studio or your
          favorite park or even your bed. You can
          listen to Robyn during the session, or Troye
          Sivan or take a hit of poppers for the hell of it.
          And yes, you’re zooming in remotely but you
          aren’t alone. You are welcomed by myself the founder of Tabula Homo.
          And there are other artists to create alongside.
        </p>
        <p  id = 'rules'> 
          The sessions happen via Zoom and you are welcome
          to attend no matter your skill level, and You aren’t
          required to create or share your art, even. The only
          thing I ask from attendants is that they respect
          the nature of this art form, by not taking photos,
          screenshots, or recording the live performance.
        </p>
      </div>
    </div>
  )
}

export default About