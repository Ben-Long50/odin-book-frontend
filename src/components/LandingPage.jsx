import { Link } from 'react-router-dom';
import PawIcon from '../assets/PawIcon';
import Button from './Button';
import Logo from './Logo';
import ProfilePic from './ProfilePic';
import { mdiChevronDoubleDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useRef, useState } from 'react';
import ScrollBar from 'react-perfect-scrollbar';
import LandingPageImage from './LandingPageImage';

const LandingPage = () => {
  const [showInfoRef1, setShowInfoRef1] = useState(false);
  const [showInfoRef2, setShowInfoRef2] = useState(false);
  const [showInfoRef3, setShowInfoRef3] = useState(false);
  const infoRef1 = useRef(null);
  const infoRef2 = useRef(null);
  const infoRef3 = useRef(null);

  const handleScroll = () => {
    if (infoRef1.current) {
      const rect = infoRef1.current.getBoundingClientRect();
      if (rect.top < window.innerHeight / 1.5) {
        setShowInfoRef1(true);
      }
    }
    if (infoRef2.current) {
      const rect = infoRef2.current.getBoundingClientRect();
      if (rect.top < window.innerHeight / 1.5) {
        setShowInfoRef2(true);
      }
    }
    if (infoRef3.current) {
      const rect = infoRef3.current.getBoundingClientRect();
      if (rect.top < window.innerHeight / 1.5) {
        setShowInfoRef3(true);
      }
    }
  };

  return (
    <ScrollBar
      onScrollY={handleScroll}
      className="h-dvh w-full overflow-y-auto overflow-x-hidden"
    >
      <div className="flex h-svh flex-col items-center justify-center gap-8">
        <p className="fade-in-welcome text-primary text-center text-xl font-semibold opacity-0 md:text-3xl">
          Welcome to
        </p>
        <div className="fade-in-logo flex grow-0 items-center justify-center gap-4 opacity-0 md:gap-8">
          <Logo textSize="text-6xl md:text-8xl " />
          <PawIcon className="size-20 md:size-32" />
        </div>
        <div className="fade-in-button flex w-full flex-col items-center opacity-0 md:mt-4">
          <Link className="mt-4 w-1/2 max-w-80 md:w-1/3" to="/signin">
            <Button className="w-full px-3 py-2 text-xl">Sign in</Button>
          </Link>
          <Link className="mt-4 w-1/2 max-w-80 md:w-1/3" to="/signup">
            <Button className="w-full px-3 py-2 text-xl">Sign up</Button>
          </Link>
        </div>
        <div className="fade-in-button absolute bottom-0 mb-4 flex flex-col items-center opacity-0 md:mb-8">
          <p className="text-tertiary text-sm">Scroll to</p>
          <p className="text-tertiary text-sm">learn more</p>
          <Icon
            className="text-tertiary fade-in-scroll"
            path={mdiChevronDoubleDown}
            size={2}
          />
        </div>
      </div>
      <section className="mt-20 flex flex-col gap-24 overflow-x-hidden py-8 text-lg md:mt-0 md:gap-32 md:text-3xl">
        <div
          ref={infoRef1}
          className={`${showInfoRef1 ? 'fade-in-infoRight' : 'opacity-0'} flex flex-col gap-6`}
        >
          <h2 className="text-primary mr-4 text-right font-logo text-3xl md:mb-4 md:mr-12 md:text-5xl">
            A pet focused community
          </h2>
          <div className="md:grid md:grid-cols-1/3">
            <div
              className={`bg-secondary-2 col-start-2 ml-4 flex w-auto items-center gap-6 rounded-l-full p-4 shadow-md shadow-gray-300 md:gap-20 md:p-8 dark:shadow-black`}
            >
              <LandingPageImage image="/cat.JPG" className="w-48 md:size-96" />
              <div>
                <p className="text-secondary leading-normal">
                  Join the social media community where your pets are the star!
                </p>
                <p className="text-tertiary mt-2 text-sm md:mt-6 md:text-2xl">
                  (Please keep posts on theme)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={infoRef2}
          className={`${showInfoRef2 ? 'fade-in-infoLeft' : 'opacity-0'} flex flex-col gap-6`}
        >
          <h2 className="text-primary ml-4 text-left font-logo text-3xl md:mb-4 md:ml-12 md:text-5xl">
            One account, many pets
          </h2>
          <div className="md:grid md:grid-cols-3/1">
            <div className="fade-in-left bg-secondary-2 col-start-1 mr-4 flex items-center justify-end gap-6 rounded-r-full p-4 pr-8 shadow-md shadow-gray-300 md:gap-20 md:p-8 md:pr-20 dark:shadow-black">
              <p className="text-secondary leading-normal">
                With one account you can manage multiple profiles each dedicated
                to a different pet
              </p>
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex justify-end gap-4 md:gap-8">
                  <LandingPageImage
                    image="/turtle.JPG"
                    className="size-20 md:size-48"
                  />
                  <LandingPageImage
                    image="/dog.PNG"
                    className="size-20 md:size-48"
                  />
                </div>
                <LandingPageImage
                  image="/cat2.jpg"
                  className="size-20 md:size-48"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          ref={infoRef3}
          className={`${showInfoRef3 ? 'fade-in-infoRight' : 'opacity-0'} flex flex-col gap-6`}
        >
          <h2 className="text-primary mr-4 text-right font-logo text-3xl md:mb-4 md:mr-12 md:text-5xl">
            Just stopping by?
          </h2>
          <div className="md:grid md:grid-cols-1/3">
            <div className="fade-in-right bg-secondary-2 col-start-2 ml-4 flex items-center gap-8 rounded-l-full p-4 shadow-md shadow-gray-300 md:gap-20 md:p-8 dark:shadow-black">
              <ProfilePic className="size-48 h-full shadow-md shadow-gray-300 md:size-96 dark:shadow-black" />
              <div>
                <p className="text-secondary leading-normal">
                  Sign in using the guest option to experience a fully featured
                  version of the app
                </p>
                <p className="text-tertiary mt-2 text-sm md:mt-6 md:text-2xl">
                  (Guest accounts are deleted on logout or after 4 hours)
                </p>
              </div>
            </div>
          </div>
        </div>
        <Link className="mx-auto w-1/2 max-w-80" to="/signin">
          <Button className="w-full px-3 py-2 text-xl md:m-4">
            Get started
          </Button>
        </Link>
      </section>
    </ScrollBar>
  );
};

export default LandingPage;
