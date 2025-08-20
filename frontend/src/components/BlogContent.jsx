import React from 'react'
import "../styles/BlogContent.css"

const BlogContent = ({blog}) => {
  return (
     <div className="container my-5 mx-9 ">
      <div className="blog-tag mb-3">
        <span className="tag-text">{blog.tag}</span>
      </div>
      <h1 className="blog-title-text" >{blog.title}</h1>
      <div className="flex align-items-center justify-content-start my-3 ">
        <img
          src={blog.authorImg}
          alt="Author"
          className="author-image img-fluid rounded-circle"
          style={{ width: "40px", height: "40px"}}
        />
        <span className=" mx-1">{blog.author} <span className='mx-3'>{blog.date}</span></span>
      </div>
      <img
        src={blog.image}
        alt="Featured"
        className="img-fluid rounded mb-4"
        style={{ maxHeight: "350px", width: "100%", objectFit: "cover" }}
      />
      <div className="blog-content">
      <p>
        Traveling is an enriching experience that opens up new horizons, exposes us to different cultures,
        and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming,
        especially if you don’t plan and prepare adequately. In this blog article, we’ll explore tips and tricks
        for a memorable journey and how to make the most of your travels.
      </p>
      <p >
        One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs.
        This includes trying local cuisine, attending cultural events and festivals, and interacting with locals.
        Learning a few phrases in the local language can also go a long way in making connections and showing respect.
      </p>
      <h4>Research your destination </h4>
      <p>efore embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid any cultural faux pas.</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Viverra adipiscing at in tellus.</p>

<h4>Plan Your Itenary</h4>
<p>
    While it's essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time and budget. Identify the must-see sights and experiences and prioritize them according to your interests and preferences. This will help you avoid overscheduling and ensure that you have time to relax and enjoy your journey.</p>
<p>
Vitae sapien pellentesque habitant morbi tristique. Luctus venenatis lectus magna fringilla. Nec ullamcorper sit amet risus nullam eget felis. Tincidunt arcu non sodales neque sodales ut etiam sit amet.
</p>
<div className="quote">
    <p> "Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy."</p>
   
</div>
<h4>Plan Lightly and Smartly</h4>
<p>Packing can be a daunting task, but with some careful planning and smart choices, you can pack light and efficiently. Start by making a packing list and sticking to it, focusing on versatile and comfortable clothing that can be mixed and matched. Invest in quality luggage and packing organizers to maximize space and minimize wrinkles.</p>

<h4>Stay Safe and Healthy</h4>
<p>Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy. This includes researching any required vaccinations or medications, staying hydrated, washing your hands frequently, and using sunscreen and insect repellent. It's also essential to keep your valuables safe and secure and to be aware of your surroundings at all times.</p>

<h4>Conclusion</h4>
<p>Traveling is an art form that requires a blend of planning, preparation, and spontaneity. By following these tips and tricks, you can make the most of your journey and create memories that last a lifetime. So pack your bags, embrace the adventure, and enjoy the ride.</p>
</div>
    </div>
  )
}

export default BlogContent