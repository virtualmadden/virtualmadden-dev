import React, { Component } from 'react'

import headShot from './assets/headShot.jpeg'
import { getMonthDay } from '../util/dateUtil.js'

class AboutPage extends Component {
  render = () => {
    let today = getMonthDay()

    return (
      <div className='card'>
        <div className='thumbnail'>
          <img src={headShot} alt='' />
        </div>
        <div className='about'>
          <h1>Jonathan Madden</h1>
          <h2>Senior Software Engineer</h2>
          <div className='separator'></div>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
            consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </p>
        </div>
        <div className='date'>
          <h5>{today.day}</h5>
          <h6>{today.month}</h6>
        </div>
        <div className='social'>
          <ul>
            <li>
              <i className='fas fa-at fa-xs'></i>
            </li>
            <li>
              <i className='fab fa-linkedin-in fa-xs'></i>
            </li>
            <li>
              <i className='fas fa-hashtag fa-xs'></i>
            </li>
          </ul>
        </div>
        <div className='resume'>
          <i className='fa fa-arrow-down fa-3x'></i>
        </div>
      </div>
    )
  }
}

export default AboutPage
