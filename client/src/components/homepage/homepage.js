import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './homepage.css'


const homepage = () => {
  return (
    <div className="parent">
      <div class="row">
        <div class="col-md">
          <h3>Newest questions</h3>
          <ul class="list-group">
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
            <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
                
          </ul>
        </div>
        <div class="col-md">
          <div class="row">
            <div class="col-12">
              <h3>People with most answers</h3>
              <ul class="list-group">
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
            <div class="col-12" className="likedQs">
              <h3>Most liked questions</h3>
              <ul class="list-group">
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default homepage
