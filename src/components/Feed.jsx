import PerfectScrollbar from 'react-perfect-scrollbar';
import Post from './Post';
import { useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/custom-scrollbar.css';

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      imgUrl:
        'https://res.cloudinary.com/dm4tmla72/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1723165012/tfjf3ew8kmyowkuenhb9.jpg',
      author: 'benjlong',
      likes: [1, 2, 3, 4, 5],
      comments: [1, 2, 3],
      body: 'Look at this cool picture of a Chinese dragon I found. I use this as a placeholder for any image during my app development process.',
    },
    {
      imgUrl:
        'https://res.cloudinary.com/dm4tmla72/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1723165012/tfjf3ew8kmyowkuenhb9.jpg',
      author: 'benjlong',
      likes: [1, 2, 3, 4, 5],
      comments: [1, 2, 3],
      body: 'Look at this cool picture of a Chinese dragon I found. I use this as a placeholder for any image during my app development process.',
    },
  ]);

  return (
    <PerfectScrollbar className="h-full overflow-y-auto">
      <div className="text-primary layout-cols center grid md:p-6 lg:p-8">
        <div className="col-start-2 col-end-3 flex flex-col justify-self-center">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default Feed;
