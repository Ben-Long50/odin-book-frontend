import { Link } from 'react-router-dom';
import PawIcon from '../assets/PawIcon';
import Button from './Button';
import Logo from './Logo';
import ProfilePic from './ProfilePic';
import { mdiChevronDoubleDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from './LayoutContext';

const LandingPage = () => {
  const { layoutSize } = useContext(LayoutContext);
  const [showInfoRef, setShowInfoRef] = useState(false);
  const infoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (infoRef.current) {
        const rect = infoRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
          setShowInfoRef(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-full w-full overflow-x-hidden md:grid md:grid-cols-2">
      <div className="flex h-svh flex-col items-center justify-center gap-8">
        <p className="fade-in-welcome text-primary text-center text-xl font-semibold opacity-0 md:text-3xl">
          Welcome to
        </p>
        <div className="fade-in-logo flex grow-0 items-center justify-center gap-4 opacity-0 md:gap-8">
          <Logo textSize="text-6xl md:text-8xl " />
          <PawIcon className="size-20 md:size-32" />
        </div>
        <div className="fade-in-button flex w-full flex-col items-center opacity-0">
          <Link className="mt-4 w-1/2 md:w-1/3" to="/signin">
            <Button className="w-full px-3 py-2 text-xl">Sign in</Button>
          </Link>
          <Link className="mt-4 w-1/2 md:w-1/3" to="/signup">
            <Button className="w-full px-3 py-2 text-xl">Sign up</Button>
          </Link>
        </div>
        {(layoutSize === 'xsmall' || layoutSize === 'small') && (
          <div className="fade-in-button absolute bottom-0 mb-4 flex flex-col items-center gap-2 opacity-0">
            <p className="text-tertiary text-sm">Learn more</p>
            <Button
              className="fade-in-scroll"
              onClick={() => scrollTo(infoRef)}
            >
              <Icon path={mdiChevronDoubleDown} size={2} />
            </Button>
          </div>
        )}
      </div>

      <section
        ref={infoRef}
        className="mt-20 flex flex-col gap-24 py-8 text-lg md:mt-0 md:gap-20 md:text-3xl"
      >
        <div
          className={`${showInfoRef ? 'fade-in-ref1' : 'opacity-0'} flex flex-col gap-6`}
        >
          <h2 className="text-primary mr-4 text-right font-logo text-3xl">
            A pet focused community
          </h2>
          <div
            className={`bg-secondary ml-4 flex w-auto items-center gap-6 rounded-l-full p-4 shadow-md shadow-gray-300 md:p-8 dark:shadow-black`}
          >
            <ProfilePic
              image="src/assets/IMG_2225.JPEG"
              className="w-1/2 shadow-md shadow-gray-300 md:w-1/3 dark:shadow-black"
            />
            <div>
              <p className="text-secondary">
                Join the social media community where your pets are the star!
              </p>
              <p className="text-tertiary mt-2 text-sm md:mt-6 md:text-2xl">
                (Please keep posts on theme)
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${showInfoRef ? 'fade-in-ref1' : 'opacity-0'} flex flex-col gap-6`}
        >
          <h2 className="text-primary ml-4 text-left font-logo text-3xl">
            One account, many pets
          </h2>
          <div className="fade-in-left bg-secondary mr-4 flex items-center gap-6 rounded-r-full p-4 pr-8 shadow-md shadow-gray-300 md:p-8 dark:shadow-black">
            <p className="text-secondary">
              With one account you can manage multiple profiles each dedicated
              to a different pet
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex justify-between gap-4 md:gap-8">
                <ProfilePic className="size-16 shadow-md shadow-gray-300 md:size-36 dark:shadow-black" />
                <ProfilePic className="size-16 shadow-md shadow-gray-300 md:size-36 dark:shadow-black" />
              </div>
              <ProfilePic className="size-16 shadow-md shadow-gray-300 md:size-36 dark:shadow-black" />
            </div>
          </div>
        </div>
        <div
          className={`${showInfoRef ? 'fade-in-ref1' : 'opacity-0'} flex flex-col gap-6`}
        >
          <h2 className="text-primary mr-4 text-right font-logo text-3xl">
            Just stopping by?
          </h2>
          <div className="fade-in-right bg-secondary ml-4 flex items-center gap-8 rounded-l-full p-4 shadow-md shadow-gray-300 md:p-8 dark:shadow-black">
            <ProfilePic className="w-1/2 shadow-md shadow-gray-300 md:size-56 md:w-1/3 dark:shadow-black" />
            <div>
              <p className="text-secondary">
                Sign in using the guest option to experience a fully featured
                version of the app
              </p>
              <p className="text-tertiary mt-2 text-sm md:mt-6 md:text-2xl">
                (Guest accounts are deleted on logout or after 4 hours)
              </p>
            </div>
          </div>
        </div>
        {(layoutSize === 'xsmall' || layoutSize === 'small') && (
          <Link className="mx-auto w-1/2" to="/signin">
            <Button className="w-full px-3 py-2 text-xl md:m-4">
              Get started
            </Button>
          </Link>
        )}
      </section>
    </div>
  );
};

export default LandingPage;
