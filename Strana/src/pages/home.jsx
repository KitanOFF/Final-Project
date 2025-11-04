import './home.css'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'

//  import arrowlogo from '../assets/arrow-right.png';
//  import logoOne from '../assets/logo-1.png'
//  import logoTwo from '../assets/logo-2.png'
//  import logoThree from '../assets/logo-3.png'
//  import logoFour from '../assets/logo-4.png'
//  import logoFive from '../assets/logo-5.png'
// import Logos from '../assets/Logos.png'


function Home () {
    return (
        <div>
            <Navbar/>
        <div className='MainPage'>
            <div className='ContainerMainPage'>
                <div className='Start'>
                    <h1>Grow your StartUp! <br/>
                        Monitoring and<br/>Evaluating now is easy!</h1>
                    <h4>Welcome to Mentor Token, where we redefine the dynamics of start-up<br/>
                        success. Our innovative platform offers a transformative approach to <br/>
                        mentorship, ensuring that mentors are not just engaged but motivated <br/>
                        to drive the success of the ventures they support.</h4>
                </div>
                <div className='Buttons'>
                     <button className="ButtonStart">
                                    <img src="./arrow-right.png" alt="arrow" className="btn-icon" />
                                             Get Started
                                    </button>
                                    <button className="btn-touch">Get in Touch</button>
                                    
                </div>
            </div>
            <div className='logos-top'>
                <img src="./logo-1.png" sr alt="Logo" />
                 <img src="./logo-2.png" alt="Logo" />
                  <img src="./logo-3.png" alt="Logo" />
                   <img src="./logo-4.png" alt="Logo" />
                    <img src="./logo-5.png" alt="Logo" />
                  
                </div>
                <div className='logos-bot'>
                <img src="./Logos.png" alt="" />
                </div>
            <div>

            </div>
            <div className='Company-startUp'>
                <h2>More than 25+ Startups  around the<br/>
                          world trusted Mentor Token.</h2>
            </div>
            
            <article className="article">
        <div className="article-image">
          <img src="./Vectary texture.png" alt="" />
        </div>
        <div className="article-paragraph">
          <h5 className="article-title">FEATURES</h5>
          <p className="article-main-text">
            Boost Your Startup's Journey: <br />
            Discover Mentor Token's Robust <br />
            Features
          </p>
        </div>
        <div className="article-cards">
          <div className="article-card">
            <span>
              <img src="./mini-rocket.svg" alt="icon1" className="acticle-icon" />
            </span>
            <h4 className="article-title">Goal Setting</h4>
            <p className="article-text">
              Set clear and achievable goals for your startup's success.
            </p>
          </div>
          <div className="article-card">
<span>
              <img src="./statistick.svg" alt="" className="acticle-icon" />
            </span>
            <h4 className="article-title">Performance Tracking</h4>
            <p className="article-text">
              Monitor mentor performance in real-time and track progress.
            </p>
          </div>
          <div className="article-card">
            <span>
              <img src="./reward.svg" alt="" className="acticle-icon" />
            </span>
            <h4 className="article-title">Reward System</h4>
            <p className="article-text">
              Motivate mentors with a secure and rewarding token-based reward
              system.
            </p>
          </div>
          <div className="article-card">
            <span>
              <img src="./books.svg" alt="" className="acticle-icon" />
            </span>
            <h4 className="article-title">Knowledge Library</h4>
            <p className="article-text">
              Access a comprehensive knowledge library to equip mentors with the
              skills, and motivation
            </p>
          </div>
        </div>
      </article>
        <div className='Sliki'>
          <p className="title-main">
          Every{" "}
          <b>
            <span className="blue-word">success</span>
          </b>{" "}
          is rewarded!
        </p>
        </div>
        </div>
        <Footer/>
        </div>
    )
}

export default Home
