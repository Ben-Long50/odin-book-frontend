import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Explore = () => {
  const [explorePosts, setExplorePosts] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]);
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    if (!explorePosts || explorePosts.length === 0) return;

    explorePosts.forEach((post, index) => {
      setTimeout(() => {
        setVisiblePosts((prevPosts) => [...prevPosts, post]);
      }, 100 * index);
    });

    return () => setVisiblePosts([]);
  }, [explorePosts]);
  return (
    <PerfectScrollbar className="h-full overflow-y-auto">
      <div className="text-primary layout-cols center grid md:p-6 lg:p-8">
        <div className="col-start-2 col-end-3 flex w-full flex-col justify-self-center">
          <h1 className="fade-in-bottom text-primary py-4 text-center text-2xl font-semibold">
            Explore
          </h1>
          <div className="grid w-full grid-cols-3 gap-1">
            {visiblePosts.map((post, index) => (
              <div
                key={index}
                className="fade-in-bottom bg-secondary-2 aspect-square"
              />
            ))}
          </div>
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default Explore;
