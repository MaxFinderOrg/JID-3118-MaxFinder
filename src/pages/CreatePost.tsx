import React from "react";
import PostCard from "../components/Post/PostCard";

const CreatePost = () => {
    return (
        <div className='center-content' style={{backgroundColor: '#e6f7ff' }}>
        
        <div style={{ paddingTop: "30px", paddingBottom: "60px"}}>
            
            <PostCard />
        </div>
        </div>
        
       
    )
}
export default CreatePost;