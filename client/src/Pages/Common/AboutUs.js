import Image from 'react-bootstrap/Image'
import Wallpaper from '../../Images/MaximizeBenefitsLogo.png'

function AboutUs() {
    return (
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
                        <div class="col-lg-6 d-none d-lg-block">
                            <img src={Wallpaper}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;