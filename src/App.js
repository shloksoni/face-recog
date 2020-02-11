import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';





const dummyState = {
  input :'',
  imageUrl: '',
  boxes : [],
  route : "signIn",
  isSignedIn : false,
  user : {
    id : '',
    name : '',
    email : '',
    entries : 0,
    joined : ''
  }
}
class App extends Component {

  constructor(){
    super();
    this.state = {
      input :'',
      imageUrl: '',
      boxes : [],
      route : "signIn",
      isSignedIn : false,
      user : {
        id : '',
        name : '',
        email : '',
        entries : 0,
        joined : ''
      }
    }
  }

  loadUser = (data) =>{
    this.setState({user : {
      id: data.id,
      name: data.name,
      email : data.email,
      entries : data.entries,
      joined : data.joined
    }})
  }


  displayFaceBox = (resp) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    let arr = [];
    resp.outputs[0].data.regions.forEach(region => {
       arr = [...arr, region.region_info.bounding_box]

    })
    
    var objBox = [];
    arr.forEach(box => {
        var obj = {}
        obj.leftCol = box.left_col * width;
        obj.topRow = box.top_row*height;
        obj.rightCol = width - (box.right_col * width) ;
        obj.bottomRow = height - (box.bottom_row * height) ;
        objBox = [...objBox, obj];
    })
    
    
     this.setState({boxes : objBox});
  }
  onRouteChange = (route) =>{
    if(route !== "home"){
      this.setState(dummyState)
    }
    else{
      this.setState({isSignedIn : true})
    }
    this.setState({route : route})
  }
  onInputChange = (event) =>{
    this.setState({input : event.target.value})
  }
  onSubmit = (event) =>{
    this.setState({imageUrl : this.state.input})

     fetch('https://fierce-meadow-34939.herokuapp.com/clarifai', {
       method: 'post',
       headers : {'Content-type' : 'application/json'},
       body: JSON.stringify({
         input : this.state.input
        })
      })
        .then(response => response.json())
        .then (response => {
          if(response){
            fetch('https://fierce-meadow-34939.herokuapp.com/image', {
              method: 'put',
              headers : {'Content-type' : 'application/json'},
              body : JSON.stringify({
                id : this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count =>{
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
             
          }
          this.displayFaceBox(response)
        })
        .catch(err => {
          console.log(err);
          
        });
  }
  render(){
    const {isSignedIn, imageUrl,boxes, route} = this.state ;
  return (
    <div className="App">
      <Particles className='particles' />
      <div style ={{display: 'flex', flexDirection:'row-reverse', justifyContent:'space-between'}}>
      <Navigation onRouteChange = {this.onRouteChange} isSignedIn ={isSignedIn}  />
      <Logo/>
      </div>
      {route === "signIn" 
      ?<SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/> 
      :route === "register"
      ?<Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
      :<div>
        <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
        <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
        <FaceRecognition url = {imageUrl} boxes = {boxes}/>
      </div>
      }
      
     
    </div>
  );
  }
}

export default App;
