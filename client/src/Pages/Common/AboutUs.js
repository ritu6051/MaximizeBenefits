import Image from 'react-bootstrap/Image'
import Wallpaper from '../../Images/wallpaper.jpeg'

const goLogin = () => {
    navigate('/Login')
  }


function AboutUs() {
    return (
        // <div className="container-fuild">
        //     <Image src={Wallpaper}></Image>
        // </div>

        
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light py-3">
            <div class="container"><a href="AboutUs" class="navbar-brand d-flex align-items-center"><strong>MaximizeBenefits</strong></a>
                <div id="navbarSupportedContent" class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active"><a href="Login" class="nav-link font-italic"> Login </a></li>
                        <li class="nav-item active"><a href="Register" class="nav-link font-italic"> Register </a></li>
      </ul>
    </div>
  </div>

  
    </nav>

    <div class="">
  <div class="container py-5">
    <div class="row h-100 align-items-center py-5">
      <div class="col-lg-6">
        <h1 class="display-4">Welcome to MaximizeBenefits!</h1>
        <p class="lead text-muted mb-0">Never Miss a Benefit Again</p>
        <p class="lead text-muted">Register <a href="Register" class="text-muted"> 
                    <u>Here</u></a>
        </p>
      </div>
      <div class="col-lg-6 d-none d-lg-block"><img src={Wallpaper}></img> </div>
    </div>
  </div>
</div>
</div> 

  // <div class ="bg-image shadow-2-strong">
  //     <div class="mask" style="background-color: rgba(0, 0, 0, 0.8);">
  //       <div class="container d-flex align-items-center justify-content-center text-center h-100">
  //         <div class="text-white">
  //           <h1 class="mb-3">Learn Bootstrap 5 with MDB</h1>
  //           <h5 class="mb-4">Best & free guide of responsive web design</h5>
  //           <a class="btn btn-outline-light btn-lg m-2" href="https://www.youtube.com/watch?v=c9B4TPnak1A" role="button"
  //             rel="nofollow" target="_blank">Start tutorial</a>
  //           <a class="btn btn-outline-light btn-lg m-2" href="https://mdbootstrap.com/docs/standard/" target="_blank"
  //             role="button">Download MDB UI KIT</a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  

        

    );
}

export default AboutUs;