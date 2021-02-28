import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

class ImgIcon extends React.Component{
    constructor(props) { 
        super(props); 
        this.state = {
          dayType: ["P",
          "D"]
        };
    } 

    render() {
     
      
        return (
             
          // <div className = "col cell">
            <div onClick={this.props.onClick} className = "container col cell">
                <div className = "row justify-content-center nopadding">
              
                  <div className ="col-ms-12  nopadding">
                    <StarRatingComponent
                  className ='rating' 
                  editing={false}
                  name="rate1" 
                  starCount={5}
                  value={this.props.data.rating}
                    />
              </div>
              </div>
               <div className = "row justify-content-center">
                <div className ="col-ms-12">
              <img className='home-card-image' src={this.props.data.media[0].mediaurl} />
              </div>
            </div>

            <div className = "row justify-content-center">
               
              {this.props.data.typeofday.map(
                (item)=>{
                  if(item==="hair cut"){
                   return(
                   <div className ={"col-ms-"+12/this.props.data.typeofday.length }> 
                      <div className="circleP">Cu</div>
                    </div>
                   )
                  }
                  if(item==="protein treatment"){
                    return(
                    <div className ={"col-ms-"+12/this.props.data.typeofday.length }> 
                      <div className="circleG">Pr</div>
                    </div>
                    )
                  }
                  if(item==="hair color"){
                    return(
                    <div className ={"col-ms-"+12/this.props.data.typeofday.length }> 
                      <div className="circleP">HC</div>
                    </div>
                    )
                  }
                  if(item==="deep conditioning"){
                    return(
                    <div className ={"col-ms-"+12/this.props.data.typeofday.length }> 
                      <div className="circleG">DC</div>
                    </div>
                    )
                  }
                  if(item==="clarifying"){
                    return(
                    <div className ={"col-ms-"+12/this.props.data.typeofday.length }> 
                      <div className="circleP">Pr</div>
                    </div>
                    )
                  }
                  
                })}
              
            </div>
            
            
            </div>

                  
          // <div className='col cell'>
            // {/* <h2>Rating from state: {rating}</h2> */}
        //   <StarRatingComponent
        //   className ='rating' 
        //   editing={false}
        //   name="rate1" 
        //   starCount={5}
        //   value={3}
        // />
          //   <img className='home-card-image' src="https://ik.imagekit.io/ojdx405rcr7/default-image.jpg" />
          //   <div className="container-circle">
          //   <div className="circle">16</div>
          //   </div>
            
          // </div>
        );
      }

}
export default ImgIcon;